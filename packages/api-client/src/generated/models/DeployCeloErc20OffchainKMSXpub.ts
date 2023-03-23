/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainKMSXpub } from './DeployErc20OffchainKMSXpub';

export type DeployCeloErc20OffchainKMSXpub = ({
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
} & DeployErc20OffchainKMSXpub);
