/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainMnemXpub } from './DeployErc20OffchainMnemXpub';

export type DeployCeloErc20OffchainMnemXpub = ({
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
} & DeployErc20OffchainMnemXpub);
