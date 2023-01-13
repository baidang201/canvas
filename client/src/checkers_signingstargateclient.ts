import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing"
import {
    defaultRegistryTypes,
    DeliverTxResponse,
    QueryClient,
    SigningStargateClient,
    SigningStargateClientOptions,
    StdFee,
} from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { id } from "ethers/lib/utils"
import Long from "long"
import { CanvasExtension, setupCanvasExtension } from "./modules/canvas/queries"
import {
    canvasTypes,
    MsgCreateCanvasEncodeObject,
    MsgPaintEncodeObject,

    typeUrlMsgCreateCanvas,
    typeUrlMsgPaint,

} from "./types/canvas/messages"
import { Pos } from "./types/canvas/player"

export const canvasDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ...defaultRegistryTypes,
    ...canvasTypes,
]

function createDefaultRegistry(): Registry {
    return new Registry(canvasDefaultRegistryTypes)
}

export class CanvasSigningStargateClient extends SigningStargateClient {
    public readonly canvasQueryClient: CanvasExtension | undefined

    public static async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<CanvasSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new CanvasSigningStargateClient(tmClient, signer, {
            registry: createDefaultRegistry(),
            ...options,
        })
    }

    protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options)
        if (tmClient) {
            this.canvasQueryClient = QueryClient.withExtensions(tmClient, setupCanvasExtension)
        }
    }

    public async createCanvas(
        creator: string,
        id: string,
        width: Long,
        height: Long,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const createMsg: MsgCreateCanvasEncodeObject = {
            typeUrl: typeUrlMsgCreateCanvas,
            value: {
                creator: creator,
                id: id,
                width: width,
                height: height,
                refundDuration: "",
                allowDenomPrefix: "",
                priceForPoint: Long.ZERO,
            },
        }
        return this.signAndBroadcast(creator, [createMsg], fee, memo)
    }

    public async paint(
        creator: string,
        id: string,
        pos: Pos,
        rgb: Long,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const paintMsg: MsgPaintEncodeObject = {
            typeUrl: typeUrlMsgPaint,
            value: {
                creator: creator,
                id: id,
                x: Long.fromNumber(pos.x),
                y: Long.fromNumber(pos.y),
                amount: rgb,
            },
        }
        return this.signAndBroadcast(creator, [paintMsg], fee, memo)
    }

}
