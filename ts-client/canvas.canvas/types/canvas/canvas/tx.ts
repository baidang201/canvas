/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "canvas.canvas";

export interface MsgCreateCanvas {
  creator: string;
  id: string;
  width: number;
  height: number;
  refundDuration: string;
  allowDenomPrefix: string;
  priceForPoint: number;
}

export interface MsgCreateCanvasResponse {
  gameIndex: string;
}

function createBaseMsgCreateCanvas(): MsgCreateCanvas {
  return { creator: "", id: "", width: 0, height: 0, refundDuration: "", allowDenomPrefix: "", priceForPoint: 0 };
}

export const MsgCreateCanvas = {
  encode(message: MsgCreateCanvas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.width !== 0) {
      writer.uint32(24).uint64(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(32).uint64(message.height);
    }
    if (message.refundDuration !== "") {
      writer.uint32(42).string(message.refundDuration);
    }
    if (message.allowDenomPrefix !== "") {
      writer.uint32(50).string(message.allowDenomPrefix);
    }
    if (message.priceForPoint !== 0) {
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
          message.width = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.refundDuration = reader.string();
          break;
        case 6:
          message.allowDenomPrefix = reader.string();
          break;
        case 7:
          message.priceForPoint = longToNumber(reader.uint64() as Long);
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
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      refundDuration: isSet(object.refundDuration) ? String(object.refundDuration) : "",
      allowDenomPrefix: isSet(object.allowDenomPrefix) ? String(object.allowDenomPrefix) : "",
      priceForPoint: isSet(object.priceForPoint) ? Number(object.priceForPoint) : 0,
    };
  },

  toJSON(message: MsgCreateCanvas): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.refundDuration !== undefined && (obj.refundDuration = message.refundDuration);
    message.allowDenomPrefix !== undefined && (obj.allowDenomPrefix = message.allowDenomPrefix);
    message.priceForPoint !== undefined && (obj.priceForPoint = Math.round(message.priceForPoint));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCanvas>, I>>(object: I): MsgCreateCanvas {
    const message = createBaseMsgCreateCanvas();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.refundDuration = object.refundDuration ?? "";
    message.allowDenomPrefix = object.allowDenomPrefix ?? "";
    message.priceForPoint = object.priceForPoint ?? 0;
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

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateCanvas(request: MsgCreateCanvas): Promise<MsgCreateCanvasResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateCanvas = this.CreateCanvas.bind(this);
  }
  CreateCanvas(request: MsgCreateCanvas): Promise<MsgCreateCanvasResponse> {
    const data = MsgCreateCanvas.encode(request).finish();
    const promise = this.rpc.request("canvas.canvas.Msg", "CreateCanvas", data);
    return promise.then((data) => MsgCreateCanvasResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
