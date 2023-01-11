/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "canvas.canvas";

export interface MsgCreateCanvas {
  creator: string;
  id: string;
  width: Long;
  height: Long;
  refundDuration: string;
  allowDenomPrefix: string;
  priceForPoint: Long;
}

export interface MsgCreateCanvasResponse {
  gameIndex: string;
}

export interface MsgPaint {
  creator: string;
  id: string;
  x: Long;
  y: Long;
  amount: Long;
}

export interface MsgPaintResponse {
  x: number;
  y: number;
}

function createBaseMsgCreateCanvas(): MsgCreateCanvas {
  return {
    creator: "",
    id: "",
    width: Long.UZERO,
    height: Long.UZERO,
    refundDuration: "",
    allowDenomPrefix: "",
    priceForPoint: Long.UZERO,
  };
}

export const MsgCreateCanvas = {
  encode(message: MsgCreateCanvas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (!message.width.isZero()) {
      writer.uint32(24).uint64(message.width);
    }
    if (!message.height.isZero()) {
      writer.uint32(32).uint64(message.height);
    }
    if (message.refundDuration !== "") {
      writer.uint32(42).string(message.refundDuration);
    }
    if (message.allowDenomPrefix !== "") {
      writer.uint32(50).string(message.allowDenomPrefix);
    }
    if (!message.priceForPoint.isZero()) {
      writer.uint32(56).uint64(message.priceForPoint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCanvas {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCanvas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.width = reader.uint64() as Long;
          break;
        case 4:
          message.height = reader.uint64() as Long;
          break;
        case 5:
          message.refundDuration = reader.string();
          break;
        case 6:
          message.allowDenomPrefix = reader.string();
          break;
        case 7:
          message.priceForPoint = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCanvas {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      width: isSet(object.width) ? Long.fromValue(object.width) : Long.UZERO,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      refundDuration: isSet(object.refundDuration) ? String(object.refundDuration) : "",
      allowDenomPrefix: isSet(object.allowDenomPrefix) ? String(object.allowDenomPrefix) : "",
      priceForPoint: isSet(object.priceForPoint) ? Long.fromValue(object.priceForPoint) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateCanvas): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.width !== undefined && (obj.width = (message.width || Long.UZERO).toString());
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.refundDuration !== undefined && (obj.refundDuration = message.refundDuration);
    message.allowDenomPrefix !== undefined && (obj.allowDenomPrefix = message.allowDenomPrefix);
    message.priceForPoint !== undefined && (obj.priceForPoint = (message.priceForPoint || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCanvas>, I>>(object: I): MsgCreateCanvas {
    const message = createBaseMsgCreateCanvas();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.width = (object.width !== undefined && object.width !== null) ? Long.fromValue(object.width) : Long.UZERO;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    message.refundDuration = object.refundDuration ?? "";
    message.allowDenomPrefix = object.allowDenomPrefix ?? "";
    message.priceForPoint = (object.priceForPoint !== undefined && object.priceForPoint !== null)
      ? Long.fromValue(object.priceForPoint)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateCanvasResponse(): MsgCreateCanvasResponse {
  return { gameIndex: "" };
}

export const MsgCreateCanvasResponse = {
  encode(message: MsgCreateCanvasResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameIndex !== "") {
      writer.uint32(10).string(message.gameIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCanvasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCanvasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCanvasResponse {
    return { gameIndex: isSet(object.gameIndex) ? String(object.gameIndex) : "" };
  },

  toJSON(message: MsgCreateCanvasResponse): unknown {
    const obj: any = {};
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCanvasResponse>, I>>(object: I): MsgCreateCanvasResponse {
    const message = createBaseMsgCreateCanvasResponse();
    message.gameIndex = object.gameIndex ?? "";
    return message;
  },
};

function createBaseMsgPaint(): MsgPaint {
  return { creator: "", id: "", x: Long.UZERO, y: Long.UZERO, amount: Long.UZERO };
}

export const MsgPaint = {
  encode(message: MsgPaint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (!message.x.isZero()) {
      writer.uint32(24).uint64(message.x);
    }
    if (!message.y.isZero()) {
      writer.uint32(32).uint64(message.y);
    }
    if (!message.amount.isZero()) {
      writer.uint32(40).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPaint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPaint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.x = reader.uint64() as Long;
          break;
        case 4:
          message.y = reader.uint64() as Long;
          break;
        case 5:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPaint {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      x: isSet(object.x) ? Long.fromValue(object.x) : Long.UZERO,
      y: isSet(object.y) ? Long.fromValue(object.y) : Long.UZERO,
      amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO,
    };
  },

  toJSON(message: MsgPaint): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.x !== undefined && (obj.x = (message.x || Long.UZERO).toString());
    message.y !== undefined && (obj.y = (message.y || Long.UZERO).toString());
    message.amount !== undefined && (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPaint>, I>>(object: I): MsgPaint {
    const message = createBaseMsgPaint();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.x = (object.x !== undefined && object.x !== null) ? Long.fromValue(object.x) : Long.UZERO;
    message.y = (object.y !== undefined && object.y !== null) ? Long.fromValue(object.y) : Long.UZERO;
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgPaintResponse(): MsgPaintResponse {
  return { x: 0, y: 0 };
}

export const MsgPaintResponse = {
  encode(message: MsgPaintResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(8).int32(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(16).int32(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPaintResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPaintResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.int32();
          break;
        case 2:
          message.y = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPaintResponse {
    return { x: isSet(object.x) ? Number(object.x) : 0, y: isSet(object.y) ? Number(object.y) : 0 };
  },

  toJSON(message: MsgPaintResponse): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = Math.round(message.x));
    message.y !== undefined && (obj.y = Math.round(message.y));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPaintResponse>, I>>(object: I): MsgPaintResponse {
    const message = createBaseMsgPaintResponse();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateCanvas(request: MsgCreateCanvas): Promise<MsgCreateCanvasResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Paint(request: MsgPaint): Promise<MsgPaintResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "canvas.canvas.Msg";
    this.rpc = rpc;
    this.CreateCanvas = this.CreateCanvas.bind(this);
    this.Paint = this.Paint.bind(this);
  }
  CreateCanvas(request: MsgCreateCanvas): Promise<MsgCreateCanvasResponse> {
    const data = MsgCreateCanvas.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCanvas", data);
    return promise.then((data) => MsgCreateCanvasResponse.decode(new _m0.Reader(data)));
  }

  Paint(request: MsgPaint): Promise<MsgPaintResponse> {
    const data = MsgPaint.encode(request).finish();
    const promise = this.rpc.request(this.service, "Paint", data);
    return promise.then((data) => MsgPaintResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
