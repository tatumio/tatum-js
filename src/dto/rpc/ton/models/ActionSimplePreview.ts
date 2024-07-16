/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountAddress } from './AccountAddress';

/**
 * shortly describes what this action is about.
 */
export type ActionSimplePreview = {
    name: string;
    description: string;
    /**
     * a link to an image for this particular action.
     */
    action_image?: string;
    value?: string;
    /**
     * a link to an image that depicts this action's asset.
     */
    value_image?: string;
    accounts: Array<AccountAddress>;
};
