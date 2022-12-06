/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowCustomTransactionPK = {
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
         * The value of the argument; can be a string or an array of strings
         */
        value: (string | any[]);
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
     * Secret for account. Secret, or signature Id must be present.
     */
    privateKey: string;
}
