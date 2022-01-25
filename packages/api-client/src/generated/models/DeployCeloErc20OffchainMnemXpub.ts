/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainMnemXpub } from './DeployErc20OffchainMnemXpub';

export type DeployCeloErc20OffchainMnemXpub = (DeployErc20OffchainMnemXpub & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployCeloErc20OffchainMnemXpub.feeCurrency;
});

export namespace DeployCeloErc20OffchainMnemXpub {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
