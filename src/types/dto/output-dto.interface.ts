export interface IExecutionResultDto {
    language: string;
    version: string;
    run: {
      stdout: string;
      stderr: string;
      code: number;
      signal?: string;
      output: string
    }
  }