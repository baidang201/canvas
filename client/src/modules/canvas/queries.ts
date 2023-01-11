import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate"
import { assert } from "@cosmjs/utils"
import Long from "long"
import { Pos } from "../../types/canvas/player"
import {
    QueryGetCanvasResponse,
    QueryGetStoredColorsResponse,
    QueryAllStoredColorsResponse,
    QueryClientImpl,
} from "../../types/generated/canvas/query"
import { Canvas } from "../../types/generated/canvas/canvas"
import { StoredColors } from "../../types/generated/canvas/stored_colors"
import { PageResponse } from "../../types/generated/cosmos/base/query/v1beta1/pagination"

export interface AllStoredGameResponse {
    storedColors: StoredColors[]
    pagination?: PageResponse
}

export interface CanvasExtension {
    readonly canvas: {
        readonly getCanvas: () => Promise<Canvas | undefined>
        readonly getStoredColors: (index: string) => Promise<StoredColors | undefined>
        readonly getAllStoredColors: (
            key: Uint8Array,
            offset: Long,
            limit: Long,
            countTotal: boolean,
        ) => Promise<AllStoredGameResponse>
    }
}

export function setupCanvasExtension(base: QueryClient): CanvasExtension {
    const rpc = createProtobufRpcClient(base)
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc)

    return {
        canvas: {
            getCanvas: async (): Promise<Canvas | undefined> => {
                const response: QueryGetCanvasResponse = await queryService.Canvas({})
                return response.Canvas
            },
            getStoredColors: async (index: string): Promise<StoredColors | undefined> => {
                const response: QueryGetStoredColorsResponse = await queryService.StoredColors({
                    index: index,
                })
                return response.storedColors
            },
            getAllStoredColors: async (
                key: Uint8Array,
                offset: Long,
                limit: Long,
                countTotal: boolean,
            ): Promise<AllStoredGameResponse> => {
                const response: QueryAllStoredColorsResponse = await queryService.StoredColorsAll({
                    pagination: {
                        key: key,
                        offset: offset,
                        limit: limit,
                        countTotal: countTotal,
                        reverse: false,
                    },
                })
                return {
                    storedColors: response.storedColors,
                    pagination: response.pagination,
                }
            },
        },
    }
}
