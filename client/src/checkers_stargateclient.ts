import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { CanvasExtension, setupCanvasExtension } from "./modules/canvas/queries"

export class CanvasStargateClient extends StargateClient {
    public readonly canvasQueryClient: CanvasExtension | undefined

    public static async connect(
        endpoint: string,
        options?: StargateClientOptions,
    ): Promise<CanvasStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new CanvasStargateClient(tmClient, options)
    }

    protected constructor(tmClient: Tendermint34Client | undefined, options: StargateClientOptions = {}) {
        super(tmClient, options)
        if (tmClient) {
            this.canvasQueryClient = QueryClient.withExtensions(tmClient, setupCanvasExtension)
        }
    }
}
