/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainKMSAddress } from './DeployErc20OffchainKMSAddress';

export type DeployCeloErc20OffchainKMSAddress = (DeployErc20OffchainKMSAddress & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
});
