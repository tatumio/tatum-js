import { Token } from 'typedi'
import { TatumConfig } from '../service/tatum/tatum.dto'

export const CONFIG = new Token<TatumConfig>('TATUM_CONFIG')
