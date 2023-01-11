import React, { FunctionComponent, useCallback, useState, CSSProperties } from "react";

import { Container, Row, Col, Modal, ModalBody, Button } from "reactstrap";
// import { useCosmosJS } from "../../hooks/use-cosmosjs";
// import { toast } from "react-toastify";

import { Canvas } from "./canvas";
// import { InfoView } from "./info";
import { CanvasInfo, CanvasId } from "./constants";
import { CanvasSigningStargateClient } from "../../checkers_signingstargateclient"
import { CanvasStargateClient } from "../../checkers_stargateclient"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { checkersChainId, getCanvasChainInfo } from "../../types/canvas/chain"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import { StoredColors } from "../../types/generated/canvas/stored_colors";
import { Canvas as TypeCanvas } from "../../types/generated/canvas/canvas";
import { useCanvas } from "../../hooks/use-canvas";


const styles: CSSProperties = {
  background: "#f8f9fe",
}

declare global {
  interface Window extends KeplrWindow {}
}

interface CreatorInfo {
  creator: string
  signingClient: CanvasSigningStargateClient
}

export const PageHome: FunctionComponent = () => {
  const isFirstView = localStorage.getItem("seen-tutorial") == null;
  // const cosmosJS = useCosmosJS(CanvasInfo);

  const [isTutorialOpen, setIsTutorialOpen] = useState(isFirstView);
  const [starGateClient, setStarGateClient] = useState<CanvasStargateClient| undefined>();
  const [signingClient, setSigningClient] = useState<CanvasSigningStargateClient| undefined>();
  const [creator, setCreator] = useState<string>();
  const [address, setAddress] = useState<any>();

  const canvas = useCanvas("", "1");

  const openTutorial = useCallback(() => {
    setIsTutorialOpen(true);
  }, []);
  const closeTutorial = useCallback(() => {
    // When the user sees the guide for the first time, the guide will not appear automatically from the next time.
    localStorage.setItem("seen-tutorial", "true");
    setIsTutorialOpen(false);
  }, []);

  const addCanvas = useCallback(() => {
    console.log("test...")
    // const toastId = toast.info("Waiting for tx to be committed", {
    //   autoClose: false
    // });

    //   if (cosmosJS.sendMsgs) {
    //     const msgs: MsgPaint[] = [];
    //     cosmosJS.sendMsgs(
    //       msgs,
    //       () => {
    //         toast.update(toastId, {
    //           type: "success",
    //           render: "Success!",
    //           autoClose: 3000
    //         });
    //       },
    //       e => {
    //         toast.update(toastId, {
    //           type: "error",
    //           render: `Failed to send tx: ${e.message}`,
    //           autoClose: 3000
    //         });
    //       }
    //     );
    //   }
    }, []);

    const getStargateClient = async (): Promise<CanvasStargateClient> =>{
      const client: CanvasStargateClient =
      starGateClient ?? (await CanvasStargateClient.connect(process.env.RPC_URL!))
      if (!starGateClient) setStarGateClient( client )
      return client
    }

  return (
    <Container fluid style={styles}>
      <Modal isOpen={isTutorialOpen} centered style={{ maxWidth: "700px" }}>
        <ModalBody>
          <h3>How to use CosCanvas</h3>
          <ol>
            <li>
              Place pixels on the canvas, and create your drawing!
            </li>
          </ol>
          <Button
            color="link"
            style={{ float: "right" }}
            onClick={closeTutorial}
          >
            I understand
          </Button>
        </ModalBody>
      </Modal>
      <Row>
        <Col lg="6">
          <Canvas
            canvasId={CanvasId}
            restEndpoint={CanvasInfo.rest}
            width={canvas.canvas?.width?? 500}
            height={canvas.canvas?.height?? 500}
          />
        </Col>
        <Col lg="6">
          <Button
            style={{ float: "right", fontSize: "1rem" }}
            color="link"
            onClick={openTutorial}
          >
            Show tutorial
          </Button>
          <Button
            style={{ float: "right", fontSize: "1rem" }}
            color="link"
            onClick={addCanvas}
          >
            Test
          </Button>
          {/* <InfoView /> */}
        </Col>
      </Row>
    </Container>
  );
};
