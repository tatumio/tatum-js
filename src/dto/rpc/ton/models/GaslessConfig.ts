/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GaslessConfig = {
    /**
     * sending excess to this address decreases the commission of a gasless transfer
     */
    relay_address: string;
    /**
     * list of jettons, any of them can be used to pay for gas
     */
    gas_jettons: Array<{
        master_id: string;
    }>;
};
