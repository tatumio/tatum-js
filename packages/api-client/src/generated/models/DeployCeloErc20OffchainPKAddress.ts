/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainPKAddress } from './DeployErc20OffchainPKAddress';

export type DeployCeloErc20OffchainPKAddress = ({
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
} & DeployErc20OffchainPKAddress);
