import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgPaint } from "./types/canvas/canvas/tx";
import { MsgCreateCanvas } from "./types/canvas/canvas/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/canvas.canvas.MsgPaint", MsgPaint],
    ["/canvas.canvas.MsgCreateCanvas", MsgCreateCanvas],
    
];

export { msgTypes }