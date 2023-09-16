import { IConfiguration } from "./configuration.interface";
import { IExecutionDto } from "./dto/execution-request-dto.interface";
import { IExecutionResultDto } from "./dto/output-dto.interface";
import { IRuntime } from "./runtime.interface";

export interface IPiston {
    configuration: IConfiguration;
    getRuntimes(): Promise<Array<IRuntime>>;
    execute(details: IExecutionDto): Promise<IExecutionResultDto>;
    executeSourceCode(sourceCode: string, language: string, stdin: string): Promise<IExecutionResultDto>;
    executeSourceCode(sourceCode: string, language: string): Promise<IExecutionResultDto>;
}