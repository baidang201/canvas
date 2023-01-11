/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Canvas } from "./canvas";
import { Params } from "./params";
import { StoredColors } from "./stored_colors";

export const protobufPackage = "canvas.canvas";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetCanvasRequest {
}

export interface QueryGetCanvasResponse {
  Canvas?: Canvas;
}

export interface QueryGetStoredColorsRequest {
  index: string;
}

export interface QueryGetStoredColorsResponse {
  storedColors?: StoredColors;
}

export interface QueryAllStoredColorsRequest {
  pagination?: PageRequest;
}

export interface QueryAllStoredColorsResponse {
  storedColors: StoredColors[];
  pagination?: PageResponse;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetCanvasRequest(): QueryGetCanvasRequest {
  return {};
}

export const QueryGetCanvasRequest = {
  encode(_: QueryGetCanvasRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCanvasRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCanvasRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryGetCanvasRequest {
    return {};
  },

  toJSON(_: QueryGetCanvasRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetCanvasRequest>, I>>(_: I): QueryGetCanvasRequest {
    const message = createBaseQueryGetCanvasRequest();
    return message;
  },
};

function createBaseQueryGetCanvasResponse(): QueryGetCanvasResponse {
  return { Canvas: undefined };
}

export const QueryGetCanvasResponse = {
  encode(message: QueryGetCanvasResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Canvas !== undefined) {
      Canvas.encode(message.Canvas, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCanvasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCanvasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Canvas = Canvas.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCanvasResponse {
    return { Canvas: isSet(object.Canvas) ? Canvas.fromJSON(object.Canvas) : undefined };
  },

  toJSON(message: QueryGetCanvasResponse): unknown {
    const obj: any = {};
    message.Canvas !== undefined && (obj.Canvas = message.Canvas ? Canvas.toJSON(message.Canvas) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetCanvasResponse>, I>>(object: I): QueryGetCanvasResponse {
    const message = createBaseQueryGetCanvasResponse();
    message.Canvas = (object.Canvas !== undefined && object.Canvas !== null)
      ? Canvas.fromPartial(object.Canvas)
      : undefined;
    return message;
  },
};

function createBaseQueryGetStoredColorsRequest(): QueryGetStoredColorsRequest {
  return { index: "" };
}

export const QueryGetStoredColorsRequest = {
  encode(message: QueryGetStoredColorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStoredColorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStoredColorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStoredColorsRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetStoredColorsRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetStoredColorsRequest>, I>>(object: I): QueryGetStoredColorsRequest {
    const message = createBaseQueryGetStoredColorsRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetStoredColorsResponse(): QueryGetStoredColorsResponse {
  return { storedColors: undefined };
}

export const QueryGetStoredColorsResponse = {
  encode(message: QueryGetStoredColorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storedColors !== undefined) {
      StoredColors.encode(message.storedColors, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStoredColorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStoredColorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedColors = StoredColors.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStoredColorsResponse {
    return { storedColors: isSet(object.storedColors) ? StoredColors.fromJSON(object.storedColors) : undefined };
  },

  toJSON(message: QueryGetStoredColorsResponse): unknown {
    const obj: any = {};
    message.storedColors !== undefined &&
      (obj.storedColors = message.storedColors ? StoredColors.toJSON(message.storedColors) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetStoredColorsResponse>, I>>(object: I): QueryGetStoredColorsResponse {
    const message = createBaseQueryGetStoredColorsResponse();
    message.storedColors = (object.storedColors !== undefined && object.storedColors !== null)
      ? StoredColors.fromPartial(object.storedColors)
      : undefined;
    return message;
  },
};

function createBaseQueryAllStoredColorsRequest(): QueryAllStoredColorsRequest {
  return { pagination: undefined };
}

export const QueryAllStoredColorsRequest = {
  encode(message: QueryAllStoredColorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStoredColorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStoredColorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStoredColorsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllStoredColorsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllStoredColorsRequest>, I>>(object: I): QueryAllStoredColorsRequest {
    const message = createBaseQueryAllStoredColorsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllStoredColorsResponse(): QueryAllStoredColorsResponse {
  return { storedColors: [], pagination: undefined };
}

export const QueryAllStoredColorsResponse = {
  encode(message: QueryAllStoredColorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.storedColors) {
      StoredColors.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStoredColorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStoredColorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedColors.push(StoredColors.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStoredColorsResponse {
    return {
      storedColors: Array.isArray(object?.storedColors)
        ? object.storedColors.map((e: any) => StoredColors.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllStoredColorsResponse): unknown {
    const obj: any = {};
    if (message.storedColors) {
      obj.storedColors = message.storedColors.map((e) => e ? StoredColors.toJSON(e) : undefined);
    } else {
      obj.storedColors = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllStoredColorsResponse>, I>>(object: I): QueryAllStoredColorsResponse {
    const message = createBaseQueryAllStoredColorsResponse();
    message.storedColors = object.storedColors?.map((e) => StoredColors.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Canvas by index. */
  Canvas(request: QueryGetCanvasRequest): Promise<QueryGetCanvasResponse>;
  /** Queries a StoredColors by index. */
  StoredColors(request: QueryGetStoredColorsRequest): Promise<QueryGetStoredColorsResponse>;
  /** Queries a list of StoredColors items. */
  StoredColorsAll(request: QueryAllStoredColorsRequest): Promise<QueryAllStoredColorsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "canvas.canvas.Query";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Canvas = this.Canvas.bind(this);
    this.StoredColors = this.StoredColors.bind(this);
    this.StoredColorsAll = this.StoredColorsAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Canvas(request: QueryGetCanvasRequest): Promise<QueryGetCanvasResponse> {
    const data = QueryGetCanvasRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Canvas", data);
    return promise.then((data) => QueryGetCanvasResponse.decode(new _m0.Reader(data)));
  }

  StoredColors(request: QueryGetStoredColorsRequest): Promise<QueryGetStoredColorsResponse> {
    const data = QueryGetStoredColorsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StoredColors", data);
    return promise.then((data) => QueryGetStoredColorsResponse.decode(new _m0.Reader(data)));
  }

  StoredColorsAll(request: QueryAllStoredColorsRequest): Promise<QueryAllStoredColorsResponse> {
    const data = QueryAllStoredColorsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StoredColorsAll", data);
    return promise.then((data) => QueryAllStoredColorsResponse.decode(new _m0.Reader(data)));
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
