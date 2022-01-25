/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftFlowPK = {
    /**
     * Chain to work with.
     */
    chain: DeployNftFlowPK.chain;
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Private key of sender address. Private key, mnemonic and index or signature Id must be present.
     */
    privateKey: string;
}

export namespace DeployNftFlowPK {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
