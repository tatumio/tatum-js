/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainPKAddress } from './DeployErc20OffchainPKAddress';

export type DeployCeloErc20OffchainPKAddress = (DeployErc20OffchainPKAddress & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployCeloErc20OffchainPKAddress.feeCurrency;
});

export namespace DeployCeloErc20OffchainPKAddress {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
