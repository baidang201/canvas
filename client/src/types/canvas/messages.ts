import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing"
import {
  MsgCreateCanvas,
  MsgCreateCanvasResponse,
  MsgPaint,
  MsgPaintResponse,
} from "../generated/canvas/tx"


export const typeUrlMsgCreateCanvas = "/canvas.canvas.MsgCreateCanvas"
export const typeUrlMsgCreateCanvasResponse = "/canvas.canvas.MsgCreateCanvasResponse"
export const typeUrlMsgPaint = "/canvas.canvas.MsgPaint"
export const typeUrlMsgPaintResponse = "/canvas.canvas.MsgPaintResponse"

export const canvasTypes: ReadonlyArray<[string, GeneratedType]> = [
    [typeUrlMsgCreateCanvas, MsgCreateCanvas],
    [typeUrlMsgCreateCanvasResponse, MsgCreateCanvasResponse],
    [typeUrlMsgPaint, MsgPaint],
    [typeUrlMsgPaintResponse, MsgPaintResponse],
]

export interface MsgCreateCanvasEncodeObject extends EncodeObject {
  readonly typeUrl: "/canvas.canvas.MsgCreateCanvas"
  readonly value: Partial<MsgCreateCanvas>
}

export function isMsgCreateGameEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCreateCanvasEncodeObject {
  return (encodeObject as MsgCreateCanvasEncodeObject).typeUrl === typeUrlMsgCreateCanvas
}

export interface MsgMsgCreateCanvasResponseEncodeObject extends EncodeObject {
  readonly typeUrl: "/canvas.canvas.MsgCreateCanvasResponse"
  readonly value: Partial<MsgCreateCanvasResponse>
}

export function isMsgCreateGameResponseEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgMsgCreateCanvasResponseEncodeObject {
  return (encodeObject as MsgMsgCreateCanvasResponseEncodeObject).typeUrl === typeUrlMsgCreateCanvasResponse
}

export interface MsgPaintEncodeObject extends EncodeObject {
  readonly typeUrl: "/canvas.canvas.MsgPaint"
  readonly value: Partial<MsgPaint>
}

export function isMsgPlayMoveEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgPaintEncodeObject {
  return (encodeObject as MsgPaintEncodeObject).typeUrl === typeUrlMsgPaint
}

export interface MsgPaintResponseEncodeObject extends EncodeObject {
  readonly typeUrl: "/canvas.canvas.MsgPaintResponse"
  readonly value: Partial<MsgPaintResponse>
}

export function isMsgPlayMoveResponseEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgPaintResponseEncodeObject {
  return (encodeObject as MsgPaintResponseEncodeObject).typeUrl === typeUrlMsgPaintResponse
}