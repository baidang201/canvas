/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "canvas.canvas";

export interface Canvas {
  width: number;
  height: number;
  refundDuration: string;
  allowDenomPrefix: string;
  priceForPoint: number;
}

function createBaseCanvas(): Canvas {
  return { width: 0, height: 0, refundDuration: "", allowDenomPrefix: "", priceForPoint: 0 };
}

export const Canvas = {
  encode(message: Canvas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.width !== 0) {
      writer.uint32(8).uint64(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(16).uint64(message.height);
    }
    if (message.refundDuration !== "") {
      writer.uint32(26).string(message.refundDuration);
    }
    if (message.allowDenomPrefix !== "") {
      writer.uint32(34).string(message.allowDenomPrefix);
    }
    if (message.priceForPoint !== 0) {
      writer.uint32(40).uint64(message.priceForPoint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Canvas {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanvas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.width = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.refundDuration = reader.string();
          break;
        case 4:
          message.allowDenomPrefix = reader.string();
          break;
        case 5:
          message.priceForPoint = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Canvas {
    return {
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      refundDuration: isSet(object.refundDuration) ? String(object.refundDuration) : "",
      allowDenomPrefix: isSet(object.allowDenomPrefix) ? String(object.allowDenomPrefix) : "",
      priceForPoint: isSet(object.priceForPoint) ? Number(object.priceForPoint) : 0,
    };
  },

  toJSON(message: Canvas): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.refundDuration !== undefined && (obj.refundDuration = message.refundDuration);
    message.allowDenomPrefix !== undefined && (obj.allowDenomPrefix = message.allowDenomPrefix);
    message.priceForPoint !== undefined && (obj.priceForPoint = Math.round(message.priceForPoint));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Canvas>, I>>(object: I): Canvas {
    const message = createBaseCanvas();
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.refundDuration = object.refundDuration ?? "";
    message.allowDenomPrefix = object.allowDenomPrefix ?? "";
    message.priceForPoint = object.priceForPoint ?? 0;
    return message;
  },
};

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
