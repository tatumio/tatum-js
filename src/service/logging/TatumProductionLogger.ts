import { LogLevel, Logger } from './logging'

interface TatumProductionLoggerOptions {
  level: LogLevel
}

const DEFAULT_PRODUCTION_OPTIONS: TatumProductionLoggerOptions = {
  level: LogLevel.INFO,
}

export class TatumProductionLogger implements Logger {
  private readonly logger = console
  private readonly options: TatumProductionLoggerOptions

  constructor(options: Partial<TatumProductionLoggerOptions> = {}) {
    this.options = { ...DEFAULT_PRODUCTION_OPTIONS, ...options }
  }

  log(...args: unknown[]): void {
    this.logger.log(...args)
  }

  trace(...args: unknown[]): void {
    if (this.options.level > LogLevel.TRACE) return
    this.logger.trace(...args)
  }

  debug(...args: unknown[]): void {
    if (this.options.level > LogLevel.DEBUG) return
    this.logger.debug(...args)
  }

  info(...args: unknown[]): void {
    if (this.options.level > LogLevel.INFO) return
    this.logger.info(...args)
  }

  warn(...args: unknown[]): void {
    if (this.options.level > LogLevel.WARN) return
    this.logger.warn(...args)
  }

  error(...args: unknown[]): void {
    if (this.options.level > LogLevel.ERROR) return
    this.logger.error(...args)
  }
}
