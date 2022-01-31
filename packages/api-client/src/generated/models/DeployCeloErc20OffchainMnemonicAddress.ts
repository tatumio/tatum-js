/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainMnemonicAddress } from './DeployErc20OffchainMnemonicAddress';

export type DeployCeloErc20OffchainMnemonicAddress = (DeployErc20OffchainMnemonicAddress & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
});
