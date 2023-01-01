import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateCanvas } from "./types/canvas/canvas/tx";
import { MsgPaint } from "./types/canvas/canvas/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/canvas.canvas.MsgCreateCanvas", MsgCreateCanvas],
    ["/canvas.canvas.MsgPaint", MsgPaint],
    
];

export { msgTypes }