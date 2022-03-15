/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TerraTx = {
    txId?: string;
    height?: number;
    timestamp?: string;
    gas_wanted?: number;
    gas_used?: number;
    logs?: Array<{
        msg_index?: number;
        events?: Array<{
            type?: string;
            attributes?: Array<{
                key?: string;
                value?: string;
            }>;
        }>;
    }>;
    code?: number;
    codespace?: string;
    tx?: {
        signatures?: Array<string>;
        auth_info?: {
            fee?: string;
            signer_infos?: Array<{
                public_key?: string;
                sequence?: number;
                mode_info?: any;
            }>;
        };
        body?: {
            memo?: string;
            timeout_height?: number;
            messages?: Array<string>;
        };
    };
}
