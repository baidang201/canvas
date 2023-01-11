import { useState, useEffect } from "react";
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

          console.log("#####in localPoints", index, localPoints)
        }
        console.log("#####before set localPoints", localPoints)
        setPoints(localPoints);
        console.log("##### points", points, baseUrl, id)
      } 
    }

    // call the function
    fetchData()
    // make sure to catch any error
    .catch(console.error);
  }, [baseUrl, id]);

  return {
    url: "",
    id,
    refresh: "",
    fetching: "",
    points
  };
};
