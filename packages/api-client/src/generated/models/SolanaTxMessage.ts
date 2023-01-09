/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaTxMessageHeader } from './SolanaTxMessageHeader';
import type { SolanaTxMessageInstruction } from './SolanaTxMessageInstruction';

export type SolanaTxMessage = {
    header?: SolanaTxMessageHeader;
    accountKeys?: Array<string>;
    recentBlockhash?: string;
    instructions?: Array<SolanaTxMessageInstruction>;
    indexToProgramIds?: any;
}
