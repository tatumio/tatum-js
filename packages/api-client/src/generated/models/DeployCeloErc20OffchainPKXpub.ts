/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainPKXpub } from './DeployErc20OffchainPKXpub';

export type DeployCeloErc20OffchainPKXpub = (DeployErc20OffchainPKXpub & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployCeloErc20OffchainPKXpub.feeCurrency;
});

export namespace DeployCeloErc20OffchainPKXpub {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
