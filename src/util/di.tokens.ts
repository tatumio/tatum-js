import { Token } from 'typedi'
import { Logger } from '../service/logger/logger.types'
import { TatumConfig } from '../service/tatum/tatum.dto'

export const CONFIG = new Token<TatumConfig>('TATUM_CONFIG')
export const LOGGER = new Token<Logger>('TATUM_LOGGER')
