/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BlockchainAccountInspect = {
    code: string;
    code_hash: string;
    methods: Array<{
        id: number;
        method: string;
    }>;
    compiler?: 'func';
};
