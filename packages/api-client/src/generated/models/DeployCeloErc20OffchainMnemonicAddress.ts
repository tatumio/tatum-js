/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainMnemonicAddress } from './DeployErc20OffchainMnemonicAddress';

export type DeployCeloErc20OffchainMnemonicAddress = (DeployErc20OffchainMnemonicAddress & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployCeloErc20OffchainMnemonicAddress.feeCurrency;
});

export namespace DeployCeloErc20OffchainMnemonicAddress {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
