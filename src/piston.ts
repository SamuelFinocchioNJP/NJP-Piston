import { IConfiguration } from './types/configuration.interface';
import { httpRequest } from './helpers/http-request';
import { IRuntime } from './types/runtime.interface';
import { IPiston } from './types/piston.interface';
import { IExecutionResultDto } from './types/dto/output-dto.interface';
import { IExecutionDto } from './types/dto/execution-request-dto.interface';
import { IPistonVersionDto } from './types/dto/piston-version-dto.interface';

class Piston implements IPiston {
    public constructor(public configuration: IConfiguration) { }

    public async execute(details: IExecutionDto): Promise<IExecutionResultDto> {
        try {
            const executionResult: IExecutionResultDto = await httpRequest(`${this.configuration.server.address}${this.configuration.server.previx}/execute`, 'POST', details) as IExecutionResultDto;
            return executionResult;
        } catch (error) {
            throw new Error("Error executing code.");
        }
    }

    public async getRuntimes(): Promise<IRuntime[]> {
        if (!this.configuration.languages) {
            try {
                this.configuration.languages = await httpRequest(`${this.configuration.server.address}${this.configuration.server.previx}/runtimes`, 'GET') as Array<IRuntime>;
            } catch (error) {
                throw new Error("Cant get runtimes, check server.");
            }
        }

        return this.configuration.languages;
    }

    public async executeSourceCode(sourceCode: string, language: string, stdin: string = ""): Promise<IExecutionResultDto> {
        const runtimes: Array<IRuntime> = await this.getRuntimes() as Array<IRuntime>;

        // Check if language is available (name or alias)
        const runtime: IRuntime | undefined = runtimes.find(
            (itRuntime: IRuntime) => itRuntime.language === language || itRuntime.aliases.includes(language)
        );

        if (!runtime) {
            throw new Error("Language not supported or not installed.");
        }

        // Execute code
        const executionOptions: IExecutionDto = {
            language: language,
            version: runtime.version,
            files: [{
                name: 'main',
                content: sourceCode
            }],
            stdin: stdin,
            compile_timeout: 10000,
            run_timeout: 2000, // 2 seconds
        };

        return await this.execute(executionOptions);
    }
}

// Piston factory
export async function piston(serverAddress: string = "https://emkc.org"): Promise<IPiston> {
    const versionResponse: IPistonVersionDto = await httpRequest(serverAddress, 'GET') as IPistonVersionDto;
    const name = versionResponse.message.split(' ')[0];
    const version = versionResponse.message.split(' ')[1];

    const configuration: IConfiguration = {
        name: name,
        version: version,
        server: {
            address: serverAddress,
            previx: '/api/v2',
        }
    };

    const runtimes: Array<IRuntime> = await httpRequest(`${configuration.server.address}${configuration.server.previx}/runtimes`, 'GET') as Array<IRuntime>;
    configuration.languages = runtimes;

    return new Piston(configuration);
}