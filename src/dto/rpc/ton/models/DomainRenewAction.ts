/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

export type DomainRenewAction = {
    domain: string;
    contract_address: string;
    renewer: AccountAddress;
};
