/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainKMSXpub } from './DeployErc20OffchainKMSXpub';

export type DeployCeloErc20OffchainKMSXpub = (DeployErc20OffchainKMSXpub & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployCeloErc20OffchainKMSXpub.feeCurrency;
});

export namespace DeployCeloErc20OffchainKMSXpub {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
