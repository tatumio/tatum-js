/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainPKXpub } from './DeployErc20OffchainPKXpub';

export type DeployCeloErc20OffchainPKXpub = ({
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
} & DeployErc20OffchainPKXpub);
