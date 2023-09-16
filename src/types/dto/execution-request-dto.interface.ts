import { IProgramFile } from "../program-file.interface";

export interface IExecutionDto {
    language: string;
    version: string;
    files: Array<IProgramFile>;
    stdin?: string;
    args?: Array<string>;
    compile_timeout: number;
    run_timeout: number;
    compile_memory_limit?: number;
    run_memory_limit?: number;
}