import chalk from 'chalk'
import { LogLevel, Logger } from './logging'

interface TatumDevelopmentLoggerOptions {
  welcome: boolean
  level: LogLevel
}

const DEFAULT_OPTIONS: TatumDevelopmentLoggerOptions = {
  welcome: true,
  level: LogLevel.INFO,
}

export class TatumDevelopmentLogger implements Logger {
  private readonly options: TatumDevelopmentLoggerOptions
  private readonly logger = console

  private readonly _trace = chalk.gray
  private readonly _debug = chalk.gray
  private readonly _info = chalk.white
  private readonly _warn = chalk.bold.yellow
  private readonly _error = chalk.bold.red

  private readonly _TRACE = chalk.bgGray.white(' TRACE ')
  private readonly _DEBUG = chalk.bgGray.white(' DEBUG ')
  private readonly _INFO = chalk.bgCyan.gray(' INFO ')
  private readonly _WARN = chalk.bgYellowBright.black(' WARN ')
  private readonly _ERROR = chalk.bgRedBright.bold.yellow(' ERROR ')

  constructor(options: Partial<TatumDevelopmentLoggerOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options }

    if (this.options.welcome) {
      this.welcome()
    }
  }

  welcome(): void {
    // TODO: welcome
    this.logger.log()
  }

  log(...args: unknown[]): void {
    this.logger.log(...args)
  }

  trace(...args: unknown[]): void {
    if (this.options.level > LogLevel.TRACE) return
    this.logger.trace(this._trace(...args))
  }

  debug(...args: unknown[]): void {
    if (this.options.level > LogLevel.DEBUG) return
    this.logger.debug(this._DEBUG, this._debug(...args))
  }

  info(...args: unknown[]): void {
    if (this.options.level > LogLevel.INFO) return
    this.logger.info(this._INFO, this._info(...args))
  }

  warn(...args: unknown[]): void {
    if (this.options.level > LogLevel.WARN) return
    this.logger.warn(this._WARN, this._warn(...args))
  }

  error(...args: unknown[]): void {
    if (this.options.level > LogLevel.ERROR) return
    this.logger.error(this._ERROR, this._error(...args))
  }
}
