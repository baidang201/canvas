import Long from "long"
import { CanvasSigningStargateClient } from "../../checkers_signingstargateclient"
import { CanvasStargateClient } from "../../checkers_stargateclient"
// import { StoredColors } from "../../sharedTypes"
// import { QueryCanPlayMoveResponse } from "../generated/canvas_/canvas/query"
//import { StoredGame } from "../generated/checkers/stored_game"
import { StoredColors } from "../generated/canvas/stored_colors"
import { Canvas } from "../generated/canvas/canvas"
// import { guiMoveToPos, storedToGameInfo } from "./board"
import { getCreatedCanvasId } from "./events"
import {Pos} from "./player"

declare module "../../checkers_stargateclient" {
    interface CanvasStargateClient {
        getCanvas(): Promise<Canvas | undefined>
        getAllStoredColors(): Promise<StoredColors[]>
        getStoredColors(index: string): Promise<StoredColors | undefined>
    }
}

declare module "../../checkers_signingstargateclient" {
    interface CanvasSigningStargateClient {
        createGuiCanvas(creator: string, id: string, width: Long, height: Long): Promise<string>
        paintGui(creator: string, id: string, pos: Pos, rgb: Long): Promise<void>
    }
}

CanvasStargateClient.prototype.getCanvas = async function (): Promise<Canvas | undefined> {
    const storedCanvas: Canvas | undefined = await this.canvasQueryClient!.canvas.getCanvas()
    if (!storedCanvas) return undefined
    return storedCanvas
}

CanvasStargateClient.prototype.getAllStoredColors = async function (): Promise<StoredColors[]> {
    return (
        await this.canvasQueryClient!.canvas.getAllStoredColors(
            Uint8Array.from([]),
            Long.ZERO,
            Long.fromNumber(1000),
            true,
        )
    ).storedColors
}

CanvasStargateClient.prototype.getStoredColors = async function (index: string): Promise<StoredColors | undefined> {
    const storedColor: StoredColors | undefined = await this.canvasQueryClient!.canvas.getStoredColors(index)
    if (!storedColor) return undefined
    return storedColor
}

CanvasSigningStargateClient.prototype.createGuiCanvas = async function (
    creator: string,
    id: string,
    width: Long,
    height: Long
): Promise<string> {
    return getCreatedCanvasId(await this.createCanvas(creator, id, width, height, "auto"), 0)
}

CanvasSigningStargateClient.prototype.paintGui = async function (
    creator: string,
    id: string,
    pos: Pos,
    rgb: Long
): Promise<void> {
    await this.paint(creator, id, pos, rgb, "auto")
}

export {}
