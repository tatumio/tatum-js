/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainKMSAddress } from './DeployErc20OffchainKMSAddress';

export type DeployCeloErc20OffchainKMSAddress = (DeployErc20OffchainKMSAddress & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployCeloErc20OffchainKMSAddress.feeCurrency;
});

export namespace DeployCeloErc20OffchainKMSAddress {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
