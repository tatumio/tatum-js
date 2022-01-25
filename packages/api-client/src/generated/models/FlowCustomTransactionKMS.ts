/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowCustomTransactionKMS = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Transaction string to send to the chain.
     */
    transaction: string;
    args: Array<{
        /**
         * Value of the argument. In case of Array type, it could be list of strings.
         */
        value: string;
        /**
         * Type of the argument
         */
        type: 'Identity' | 'UInt' | 'Int' | 'UInt8' | 'Int8' | 'UInt16' | 'Int16' | 'UInt32' | 'Int32' | 'UInt64' | 'Int64' | 'UInt128' | 'Int128' | 'UInt256' | 'Int256' | 'Word8' | 'Word16' | 'Word32' | 'Word64' | 'UFix64' | 'Fix64' | 'String' | 'Character' | 'Bool' | 'Address' | 'Void' | 'Optional' | 'Reference' | 'Array' | 'Dictionary' | 'Event' | 'Resource' | 'Struct';
        /**
         * Type of the argument
         */
        subType?: 'Identity' | 'UInt' | 'Int' | 'UInt8' | 'Int8' | 'UInt16' | 'Int16' | 'UInt32' | 'Int32' | 'UInt64' | 'Int64' | 'UInt128' | 'Int128' | 'UInt256' | 'Int256' | 'Word8' | 'Word16' | 'Word32' | 'Word64' | 'UFix64' | 'Fix64' | 'String' | 'Character' | 'Bool' | 'Address' | 'Void' | 'Optional' | 'Reference' | 'Array' | 'Dictionary' | 'Event' | 'Resource' | 'Struct';
    }>;
    /**
     * Identifier of the secret associated in signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
}
