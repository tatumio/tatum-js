/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainMnemonicAddress } from './DeployErc20OffchainMnemonicAddress';

export type DeployCeloErc20OffchainMnemonicAddress = ({
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
} & DeployErc20OffchainMnemonicAddress);
