import { useState, useEffect, useRef } from "react";
import { CanvasSigningStargateClient } from "../checkers_signingstargateclient"
import { CanvasStargateClient } from "../checkers_stargateclient"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { checkersChainId, getCanvasChainInfo } from "../types/canvas/chain"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import { StoredColors } from "../types/generated/canvas/stored_colors";
import { Canvas as TypeCanvas } from "../types/generated/canvas/canvas";
import {} from "../types/canvas/extensions-gui"

export interface Point {
  x: string;
  y: string;
  color: string;
}

/**
 * @param baseUrl Url of rest endpoint
 */
export const useCanvasPoints = (baseUrl: string, id: string) => {
  const [url, setUrl] = useState("");

  const [points, setPoints] = useState<Point[]>([]);

  const [starGateClient, setStarGateClient] = useState<CanvasStargateClient| undefined>();
  const [signingClient, setSigningClient] = useState<CanvasSigningStargateClient| undefined>();
  const [creator, setCreator] = useState<string>();
  const [address, setAddress] = useState<any>();

  const [value, setValue] = useState<number>(0);
  const [timers, setTimers] = useState<Array<NodeJS.Timeout>>([]);
  const saveCallBack: any = useRef();
  const callBack = () => {
    setValue(value + 1);
  };

  useEffect(() => {
    saveCallBack.current = callBack;
    return () => {};
  });
  useEffect(() => {
    const tick = () => {
      saveCallBack.current();
    };
    const timer: NodeJS.Timeout = setInterval(tick, 3000);
    timers.push(timer);
    setTimers(timers);
    console.log(timers);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getStargateClient = async (): Promise<CanvasStargateClient> =>{
    const client: CanvasStargateClient =
    starGateClient ?? (await CanvasStargateClient.connect(process.env.RPC_URL!))
    if (!starGateClient) setStarGateClient( client )
    return client
  }

  useEffect(() => {
    // Clear the informations of reward if id is changed.
    const fetchData = async () => {
      const chainPoints: StoredColors[] = await (
        await getStargateClient()
      ).getAllStoredColors();

      if (chainPoints) {
        var localPoints: Point[] = [];

        for (let index = 0; index < chainPoints.length; index++) {
          const item = chainPoints[index];
          const rgSplitted = item.index.split("/"); 
          let x = rgSplitted[0];
          let y = rgSplitted[1];

          const p: Point = {
            x: x,
            y: y,
            color: item.color.toString(),
          };

          localPoints.push(p)
        }
        setPoints(localPoints);
      } 
    }

    // call the function
    fetchData()
    // make sure to catch any error
    .catch(console.error);
  }, [baseUrl, id, value]);

  return {
    url: "",
    id,
    refresh: "",
    fetching: "",
    points
  };
};
