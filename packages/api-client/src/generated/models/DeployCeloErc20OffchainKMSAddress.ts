/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainKMSAddress } from './DeployErc20OffchainKMSAddress';

export type DeployCeloErc20OffchainKMSAddress = ({
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
} & DeployErc20OffchainKMSAddress);
