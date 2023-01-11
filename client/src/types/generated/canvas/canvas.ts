/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "canvas.canvas";

export interface Canvas {
  width: Long;
  height: Long;
  refundDuration: string;
  allowDenomPrefix: string;
  priceForPoint: Long;
}

function createBaseCanvas(): Canvas {
  return { width: Long.UZERO, height: Long.UZERO, refundDuration: "", allowDenomPrefix: "", priceForPoint: Long.UZERO };
}

export const Canvas = {
  encode(message: Canvas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.width.isZero()) {
      writer.uint32(8).uint64(message.width);
    }
    if (!message.height.isZero()) {
      writer.uint32(16).uint64(message.height);
    }
    if (message.refundDuration !== "") {
      writer.uint32(26).string(message.refundDuration);
    }
    if (message.allowDenomPrefix !== "") {
      writer.uint32(34).string(message.allowDenomPrefix);
    }
    if (!message.priceForPoint.isZero()) {
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
          message.width = reader.uint64() as Long;
          break;
        case 2:
          message.height = reader.uint64() as Long;
          break;
        case 3:
          message.refundDuration = reader.string();
          break;
        case 4:
          message.allowDenomPrefix = reader.string();
          break;
        case 5:
          message.priceForPoint = reader.uint64() as Long;
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
      width: isSet(object.width) ? Long.fromValue(object.width) : Long.UZERO,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      refundDuration: isSet(object.refundDuration) ? String(object.refundDuration) : "",
      allowDenomPrefix: isSet(object.allowDenomPrefix) ? String(object.allowDenomPrefix) : "",
      priceForPoint: isSet(object.priceForPoint) ? Long.fromValue(object.priceForPoint) : Long.UZERO,
    };
  },

  toJSON(message: Canvas): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = (message.width || Long.UZERO).toString());
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.refundDuration !== undefined && (obj.refundDuration = message.refundDuration);
    message.allowDenomPrefix !== undefined && (obj.allowDenomPrefix = message.allowDenomPrefix);
    message.priceForPoint !== undefined && (obj.priceForPoint = (message.priceForPoint || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Canvas>, I>>(object: I): Canvas {
    const message = createBaseCanvas();
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
