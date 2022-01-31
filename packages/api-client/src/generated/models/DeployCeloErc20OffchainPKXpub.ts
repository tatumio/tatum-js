/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainPKXpub } from './DeployErc20OffchainPKXpub';

export type DeployCeloErc20OffchainPKXpub = (DeployErc20OffchainPKXpub & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
});
