/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NeoAsset = {
    version?: number;
    id?: string;
    type?: string;
    name?: Array<{
        lang?: string;
        name?: string;
    }>;
    amount?: string;
    available?: string;
    precision?: number;
    owner?: string;
    admin?: string;
    issuer?: string;
    expiration?: number;
    frozen?: boolean;
}
