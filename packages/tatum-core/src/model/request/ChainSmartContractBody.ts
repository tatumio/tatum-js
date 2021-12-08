import { SCBody } from './SmartContractBody'

export type ChainSCBody = Omit<SCBody, 'chain'>
