import { IRuntime } from "./runtime.interface";

export interface IConfiguration {
    name: string;
    version: string;
    server: {
        address: string;
        previx: string;
    };
    languages?: Array<IRuntime>;
};
