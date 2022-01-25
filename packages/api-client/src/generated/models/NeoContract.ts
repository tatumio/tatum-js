/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NeoContract = {
    version?: number;
    hash?: string;
    script?: string;
    parameters?: Array<string>;
    returntype?: string;
    name?: string;
    code_version?: string;
    author?: string;
    email?: string;
    description?: string;
    properties?: {
        storage?: boolean;
        dynamic_invoke?: boolean;
    };
}
