import React, {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { GithubPicker } from "react-color";
import { CanvasUtils } from "./utils";
import { Color, Point, DenomToColor, CanvasInfo} from "./constants";
import { Button } from "reactstrap";
// import { useCosmosJS } from "../../hooks/use-cosmosjs";
// import { useWalletProvider } from "../../hooks/use-wallet-provider";
// import { MsgPaint } from "../../x/canvas";
// import { AccAddress } from "@everett-protocol/cosmosjs/common/address";
// import { Coin } from "@everett-protocol/cosmosjs/common/coin";
import { useCanvasPoints } from "../../hooks/use-canvas-points";

import { ToastContainer, toast } from "react-toastify";
// import { ColorRect } from "./info";
import { CanvasSigningStargateClient } from "../../checkers_signingstargateclient"
import { CanvasStargateClient } from "../../checkers_stargateclient"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { checkersChainId, getCanvasChainInfo } from "../../types/canvas/chain"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import { StoredColors } from "../../types/generated/canvas/stored_colors";
import { Canvas as TypeCanvas } from "../../types/generated/canvas/canvas";
import Long from "long"

// Doesn't have a definition.
const PinchZoomPan = require("react-responsive-pinch-zoom-pan").default;

declare global {
  interface Window extends KeplrWindow {}
}

interface CreatorInfo {
  creator: string
  signingClient: CanvasSigningStargateClient
}

export const CanvasTools: FunctionComponent<{
  onColorChange: (c: Color) => void;
  onPaint: () => void;
}> = ({ onColorChange, onPaint }) => {
  const colors = Object.values(DenomToColor);

  const onColorChangeCallback = useCallback(
    (e: any) => {
      for (const denom of Object.keys(DenomToColor)) {
        if (DenomToColor[denom].toLowerCase() === e.hex.toLowerCase()) {
          onColorChange({
            denom,
            color: e.hex
          });
          break;
        }
      }
    },
    [onColorChange]
  );

  return (
    <div>
      <GithubPicker colors={colors} onChangeComplete={onColorChangeCallback} />
      <Button size="sm" color="primary" onClick={onPaint}>
        Paint
      </Button>
    </div>
  );
};

export const Canvas: FunctionComponent<{
  canvasId: string;
  restEndpoint: string;
  width: number;
  height: number;
}> = ({ canvasId, restEndpoint, width, height }) => {
  const [scale] = useState(10);

  const canvasPoints = useCanvasPoints(restEndpoint, canvasId);

  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: -1,
    y: -1
  });

  const [pointsToFill, setPointsToFill] = useState<Point[]>([]);

  const [colorToFill, setColorToFill] = useState<Color | undefined>(undefined);

  // const cosmosJS = useCosmosJS(CanvasInfo);

  const backLayer = useRef<HTMLCanvasElement>(null);
  const frontLayer = useRef<HTMLCanvasElement>(null);
  
  const [starGateClient, setStarGateClient] = useState<CanvasStargateClient| undefined>();
  const [signingClient, setSigningClient] = useState<CanvasSigningStargateClient| undefined>();
  const [creator, setCreator] = useState<string>();
  const [address, setAddress] = useState<any>();

  useEffect(() => {
    if (backLayer.current) {
      const ctx = backLayer.current.getContext("2d");
      if (ctx) {
        CanvasUtils.clear(ctx, width, height, scale);

        CanvasUtils.drawRect(ctx, 0, 0, width, height, scale, "white");
        
        for (const point of canvasPoints.points) {
          let fill = "#" + parseInt(point.color).toString(16);
          if (!fill) {
            fill = "#000000";
          }
          CanvasUtils.drawRect(
            ctx,
            parseFloat(point.x),
            parseFloat(point.y),
            1,
            1,
            scale,
            fill
          );
        }
      }
    }
  }, [backLayer.current, width, height, scale, canvasPoints.points]);

  useEffect(() => {
    if (frontLayer.current) {
      const ctx = frontLayer.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width * scale, height * scale);

        for (const point of pointsToFill) {
          CanvasUtils.drawOutlinedRect(
            ctx,
            point.x,
            point.y,
            1,
            1,
            scale,
            DenomToColor[point.color] ? DenomToColor[point.color] : "black",
            "black",
            0.1
          );
        }

        if (colorToFill && mousePosition.x >= 0 && mousePosition.y >= 0) {
          CanvasUtils.drawOutlinedRect(
            ctx,
            mousePosition.x,
            mousePosition.y,
            1,
            1,
            scale,
            colorToFill.color,
            "black",
            0.1
          );
        }
      }
    }
  }, [frontLayer.current, mousePosition, scale, colorToFill, pointsToFill]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (frontLayer.current) {
        const rect = frontLayer.current.getBoundingClientRect();
        const scaleX = frontLayer.current.width / rect.width;
        const scaleY = frontLayer.current.height / rect.height;

        setMousePosition({
          x: Math.floor(((e.clientX - rect.left) * scaleX) / scale),
          y: Math.floor(((e.clientY - rect.top) * scaleY) / scale)
        });
      }
    },
    [frontLayer.current]
  );

  const onClick = useCallback(() => {
    if (colorToFill && mousePosition.x >= 0 && mousePosition.y >= 0) {
      const prevPointIndex = pointsToFill.findIndex(
        p => p.x === mousePosition.x && p.y === mousePosition.y
      );
      const prevPoint =
        prevPointIndex > -1 ? pointsToFill[prevPointIndex] : undefined;
      if (prevPoint && prevPoint.color === colorToFill.denom) {
        return;
      }

      let _pointsToFill = pointsToFill.slice();
      if (prevPointIndex > -1) {
        _pointsToFill = _pointsToFill
          .slice(0, prevPointIndex)
          .concat(_pointsToFill.slice(prevPointIndex + 1));
      }
      _pointsToFill.push({
        x: mousePosition.x,
        y: mousePosition.y,
        color: colorToFill.denom
      });
      setPointsToFill(_pointsToFill);
    }
  }, [mousePosition, pointsToFill]);

  const [mouseDown, setMouseDown] = useState<
    | {
        x: number;
        y: number;
      }
    | undefined
  >();
  const onMouseDown = useCallback((e: MouseEvent) => {
    setMouseDown({
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (mouseDown) {
        if (
          Math.abs(mouseDown.x - e.clientX) < 10 &&
          Math.abs(mouseDown.y - e.clientY) < 10
        ) {
          onClick();
        }
      }
      setMouseDown(undefined);
    },
    [mouseDown, onClick]
  );

  const onPaint = useCallback( async() => {
    if (
      pointsToFill.length > 0
    ) {
      for (const point of pointsToFill) {
        const { creator, signingClient } = await getSigningStargateClient()
        try {
            await signingClient.paintGui(creator, "0", point, Long.fromNumber(parseInt(point.color)) )
        } catch (e) {
            console.error(e)
            alert("Failed to paintGui: " + e)
        }

      }

      // if (msgs.length > 0) {
      //   const gas = 50000 + msgs.length * 30000;

      //   const toastId = toast.info("Waiting for tx to be committed", {
      //     autoClose: false
      //   });
      //   cosmosJS.sendMsgs(
      //     msgs,
      //     {
      //       gas: gas,
      //       memo: "",
      //       fee: new Coin("ustake", gas * 0.025)
      //     },
      //     () => {
      //       toast.update(toastId, {
      //         type: "success",
      //         render: "Success!",
      //         autoClose: 3000
      //       });
      //       if (canvasPoints.refresh) {
      //         const promise = canvasPoints.refresh();
      //         if (promise) {
      //           promise.then(() => {
      //             setPointsToFill([]);
      //           });
      //         }
      //       } else {
      //         setPointsToFill([]);
      //       }
      //     },
      //     (e: any )=> {
      //       toast.update(toastId, {
      //         type: "error",
      //         render: `Failed to send tx: ${e.message}`,
      //         autoClose: 3000
      //       });
      //     }
      //   );
      // }
    }
  //}, [cosmosJS, pointsToFill]);
  }, [pointsToFill]);

  const getStargateClient = async (): Promise<CanvasStargateClient> =>{
    const client: CanvasStargateClient =
    starGateClient ?? (await CanvasStargateClient.connect(process.env.RPC_URL!))
    if (!starGateClient) setStarGateClient( client )
    return client
  }

  const getSigningStargateClient = async (): Promise<CreatorInfo> =>{
    if (creator && signingClient)
        return {
            creator: creator,
            signingClient: signingClient,
        }
    const { keplr } = window
    if (!keplr) {
        alert("You need to install Keplr")
        throw new Error("You need to install Keplr")
    }
    await keplr.experimentalSuggestChain(getCanvasChainInfo())
    const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(checkersChainId)
    const new_creator = (await offlineSigner.getAccounts())[0].address
    const client: CanvasSigningStargateClient = await CanvasSigningStargateClient.connectWithSigner(
      process.env.RPC_URL!,
        offlineSigner,
        {
            gasPrice: GasPrice.fromString("1stake"),
        },
    )
    setCreator(new_creator);
    setSigningClient(client);

    return { creator: new_creator, signingClient: client }
  }

  const loadGame = async(): Promise<void> => {
    const canvas: TypeCanvas | undefined = await (
      await getStargateClient()
    ).getCanvas()
    if (!canvas) {
        alert("Canvas does not exist")
        return
    }

    const colors: StoredColors[] = await (
        await getStargateClient()
    ).getAllStoredColors()

    // todo this.setState
  }

  return (
    <div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: 1 }} />
        <div
          style={{
            position: "relative",
            width: `${width}px`,
            height: `${height}px`
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${width}px`,
              height: `${height}px`,
              overflow: "hidden"
            }}
          >
            <PinchZoomPan initialScale={2} minScale={1} maxScale={16}>
              <div>
                <canvas
                  ref={backLayer}
                  style={{
                    position: "absolute",
                    zIndex: -1,
                    transformOrigin: "top left",
                    transform: `scale(${1 / scale})`
                  }}
                  width={width * scale}
                  height={height * scale}
                />
                <canvas
                  ref={frontLayer}
                  style={{
                    transformOrigin: "top left",
                    transform: `scale(${1 / scale})`
                  }}
                  width={width * scale}
                  height={height * scale}
                  onMouseMove={onMouseMove}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                />
              </div>
            </PinchZoomPan>
          </div>
          <div style={{ position: "absolute", right: 0 }}>
            <CanvasTools onColorChange={setColorToFill} onPaint={onPaint} />
          </div>
          <ToastContainer hideProgressBar={false} draggable />
        </div>
        <div style={{ flex: 1 }} />
      </div>
      <h3 className="mt-3 mb-0" style={{ width: "100%", textAlign: "center" }}>
        Color Used
      </h3>
      <PointsUsed points={pointsToFill} />
    </div>
  );
};

export const PointsUsed: FunctionComponent<{
  points: Point[];
}> = ({ points }) => {
  const numPoints = useMemo(() => {
    const obj: { [denom: string]: number } = {};
    for (const p of points) {
      if (obj[p.color] == null) {
        obj[p.color] = 1;
      } else {
        obj[p.color]++;
      }
    }
    

    return obj;
  }, [points]);

  return (
    <div className="mt-1" style={{ display: "flex" }}>
      <div style={{ flex: 1 }} />
      {Object.keys(numPoints).map(color => {
        return (
          <div style={{ display: "flex" }}>
            {/* <ColorRect fill={DenomToColor[color] || "#000000"} /> */}
            <p className="mx-1 mr-2">{numPoints[color]}</p>
          </div>
        );
      })}
      <div style={{ flex: 1 }} />
    </div>
  );
};
