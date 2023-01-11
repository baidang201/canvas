/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "canvas.canvas";

export interface StoredColors {
  index: string;
  color: Long;
}

function createBaseStoredColors(): StoredColors {
  return { index: "", color: Long.UZERO };
}

export const StoredColors = {
  encode(message: StoredColors, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (!message.color.isZero()) {
      writer.uint32(16).uint64(message.color);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoredColors {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoredColors();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.color = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoredColors {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      color: isSet(object.color) ? Long.fromValue(object.color) : Long.UZERO,
    };
  },

  toJSON(message: StoredColors): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.color !== undefined && (obj.color = (message.color || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoredColors>, I>>(object: I): StoredColors {
    const message = createBaseStoredColors();
    message.index = object.index ?? "";
    message.color = (object.color !== undefined && object.color !== null) ? Long.fromValue(object.color) : Long.UZERO;
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
