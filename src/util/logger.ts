import { TatumConfig } from '../service'
import {
  TatumDevelopmentBrowserLogger,
  TatumDevelopmentLogger,
  TatumProductionLogger,
  TatumQuietLogger,
} from '../service/logger'

export const LoggerUtils = {
  setLoggerForEnv: (config: TatumConfig, isDevelopment: boolean, isBrowser: boolean) => {
    if (config.quiet) config.logger = new TatumQuietLogger()
    config.logger ??= LoggerUtils.getDefaultLogger(isDevelopment, isBrowser)
  },

  // TODO: make this tree shakeable
  getDefaultLogger: (isDevelopment: boolean, isBrowser: boolean) => {
    if (!isDevelopment && !isBrowser) return new TatumProductionLogger()
    if (isBrowser) return new TatumDevelopmentBrowserLogger()
    return new TatumDevelopmentLogger()
  },
}
