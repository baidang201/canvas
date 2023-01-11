import { useState, useEffect } from "react";
// import { useFetch } from "./use-fetch";
import { CanvasSigningStargateClient } from "../checkers_signingstargateclient"
import { CanvasStargateClient } from "../checkers_stargateclient"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { checkersChainId, getCanvasChainInfo } from "../types/canvas/chain"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import { StoredColors } from "../types/generated/canvas/stored_colors";
import { Canvas as TypeCanvas } from "../types/generated/canvas/canvas";
import {} from "../types/canvas/extensions-gui"

export interface Canvas {
  id: string;
  width: number;
  height: number;
  refund_duration: string;
  allowDenomPrefix: string;
  priceForPoint: string;
}

/**
 * @param baseUrl Url of rest endpoint
 */
export const useCanvas = (baseUrl: string, id: string) => {
  const [url, setUrl] = useState("");

  const [canvas, setCanvas] = useState<Canvas | undefined>(undefined);

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

  useEffect(() =>  {
    const fetchData = async () => {
      const canvas: TypeCanvas | undefined = await (
        await getStargateClient()
      ).getCanvas()
  
      if (!canvas) {
        setCanvas(canvas);
        console.log("#### canvas is", canvas);
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
    canvas
  };
};
