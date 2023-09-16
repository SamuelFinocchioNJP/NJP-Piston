"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piston = void 0;
const http_request_1 = require("./helpers/http-request");
class Piston {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async execute(details) {
        try {
            const executionResult = await (0, http_request_1.httpRequest)(`${this.configuration.server.address}${this.configuration.server.previx}/execute`, 'POST', details);
            return executionResult;
        }
        catch (error) {
            throw new Error("Error executing code.");
        }
    }
    async getRuntimes() {
        if (!this.configuration.languages) {
            try {
                this.configuration.languages = await (0, http_request_1.httpRequest)(`${this.configuration.server.address}${this.configuration.server.previx}/runtimes`, 'GET');
            }
            catch (error) {
                throw new Error("Cant get runtimes, check server.");
            }
        }
        return this.configuration.languages;
    }
    async executeSourceCode(sourceCode, language, stdin = "") {
        const runtimes = await this.getRuntimes();
        // Check if language is available (name or alias)
        const runtime = runtimes.find((itRuntime) => itRuntime.language === language || itRuntime.aliases.includes(language));
        if (!runtime) {
            throw new Error("Language not supported or not installed.");
        }
        // Execute code
        const executionOptions = {
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
async function piston(serverAddress = "https://emkc.org") {
    const versionResponse = await (0, http_request_1.httpRequest)(serverAddress, 'GET');
    const name = versionResponse.message.split(' ')[0];
    const version = versionResponse.message.split(' ')[1];
    const configuration = {
        name: name,
        version: version,
        server: {
            address: serverAddress,
            previx: '/api/v2',
        }
    };
    const runtimes = await (0, http_request_1.httpRequest)(`${configuration.server.address}${configuration.server.previx}/runtimes`, 'GET');
    configuration.languages = runtimes;
    return new Piston(configuration);
}
exports.piston = piston;
