export type SdkLoggerConfig = {
  log(message: unknown, ...optionalParams: unknown[]): void
  debug?(message: unknown, ...optionalParams: unknown[]): void
  info?(message: unknown, ...optionalParams: unknown[]): void
  warn?(message: unknown, ...optionalParams: unknown[]): void
  error?(message: unknown, ...optionalParams: unknown[]): void
}

const consoleLogger: SdkLoggerConfig = {
  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(message, ...optionalParams)
  },
  debug(message: unknown, ...optionalParams: unknown[]) {
    console.debug(message, ...optionalParams)
  },
  info(message: unknown, ...optionalParams: unknown[]) {
    console.info(message, ...optionalParams)
  },
  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(message, ...optionalParams)
  },
  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(message, ...optionalParams)
  },
}

const ignoredLogger: SdkLoggerConfig = {
  log(message: unknown, ...optionalParams: unknown[]) {
    //ignore
  },
}

export const LoggerDefaultConfigs = {
  ignoredLogger,
  consoleLogger,
}

export type SdkLogger = {
  useLogger(logger?: SdkLoggerConfig): void
  log(message: unknown, ...optionalParams: unknown[]): void
  debug(message: unknown, ...optionalParams: unknown[]): void
  info(message: unknown, ...optionalParams: unknown[]): void
  warn(message: unknown, ...optionalParams: unknown[]): void
  error(message: unknown, ...optionalParams: unknown[]): void
}

export const logger: SdkLogger = {
  log(message: unknown, ...optionalParams) {
    activeLogger.log(message, ...optionalParams)
  },
  debug(message: unknown, ...optionalParams: unknown[]) {
    const logMethod = activeLogger.debug ?? activeLogger.log
    logMethod(message, ...optionalParams)
  },
  info(message: unknown, ...optionalParams: unknown[]) {
    const logMethod = activeLogger.info ?? activeLogger.log
    logMethod(message, ...optionalParams)
  },
  warn(message: unknown, ...optionalParams: unknown[]) {
    const logMethod = activeLogger.warn ?? activeLogger.log
    logMethod(message, ...optionalParams)
  },
  error(message: unknown, ...optionalParams: unknown[]) {
    const logMethod = activeLogger.error ?? activeLogger.log
    logMethod(message, ...optionalParams)
  },
  useLogger(customLogger?: SdkLoggerConfig) {
    if (customLogger) {
      activeLogger = customLogger
    }
  },
}

let activeLogger = LoggerDefaultConfigs.ignoredLogger
