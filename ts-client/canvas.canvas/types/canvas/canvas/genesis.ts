/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Canvas } from "./canvas";
import { Params } from "./params";
import { StoredColors } from "./stored_colors";

export const protobufPackage = "canvas.canvas";

/** GenesisState defines the canvas module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  canvas:
    | Canvas
    | undefined;
  /** this line is used by starport scaffolding # genesis/proto/state */
  storedColorsList: StoredColors[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, canvas: undefined, storedColorsList: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.canvas !== undefined) {
      Canvas.encode(message.canvas, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.storedColorsList) {
      StoredColors.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.canvas = Canvas.decode(reader, reader.uint32());
          break;
        case 3:
          message.storedColorsList.push(StoredColors.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      canvas: isSet(object.canvas) ? Canvas.fromJSON(object.canvas) : undefined,
      storedColorsList: Array.isArray(object?.storedColorsList)
        ? object.storedColorsList.map((e: any) => StoredColors.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.canvas !== undefined && (obj.canvas = message.canvas ? Canvas.toJSON(message.canvas) : undefined);
    if (message.storedColorsList) {
      obj.storedColorsList = message.storedColorsList.map((e) => e ? StoredColors.toJSON(e) : undefined);
    } else {
      obj.storedColorsList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.canvas = (object.canvas !== undefined && object.canvas !== null)
      ? Canvas.fromPartial(object.canvas)
      : undefined;
    message.storedColorsList = object.storedColorsList?.map((e) => StoredColors.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
