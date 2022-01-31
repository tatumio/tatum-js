/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainPKAddress } from './DeployErc20OffchainPKAddress';

export type DeployCeloErc20OffchainPKAddress = (DeployErc20OffchainPKAddress & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
});
