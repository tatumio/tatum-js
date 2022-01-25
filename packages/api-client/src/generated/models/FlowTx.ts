/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowTx = {
    /**
     * Id of the block
     */
    referenceBlockId?: string;
    /**
     * Script to execute in the transaction
     */
    script?: string;
    /**
     * Args to the transaction
     */
    args?: Array<{
        type?: string;
        value?: string;
    }>;
    /**
     * Gas limit for the transaction
     */
    gasLimit?: number;
    proposalKey?: {
        address?: string;
        keyId?: number;
        sequenceNumber?: number;
    };
    /**
     * Address from which the assets and fees were debited
     */
    payer?: string;
    /**
     * Array of payload signatures.
     */
    payloadSignatures?: Array<{
        address?: string;
        keyId?: number;
        signature?: string;
    }>;
    /**
     * Array of envelope signatures.
     */
    envelopeSignatures?: Array<{
        address?: string;
        keyId?: number;
        signature?: string;
    }>;
    /**
     * Status of the transaction
     */
    status?: number;
    /**
     * Status cofe of the transaction
     */
    statusCode?: number;
    errorMessage?: string;
    events?: Array<{
        type?: string;
        transactionId?: string;
        transactionIndex?: number;
        eventIndex?: number;
        /**
         * Event specific data. May vary.
         */
        data?: any;
    }>;
}
