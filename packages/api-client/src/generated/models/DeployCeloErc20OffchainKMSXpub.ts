/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeployErc20OffchainKMSXpub } from './DeployErc20OffchainKMSXpub';

export type DeployCeloErc20OffchainKMSXpub = (DeployErc20OffchainKMSXpub & {
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
});
