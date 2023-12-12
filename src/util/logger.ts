import chalk, { Chalk } from 'chalk'

interface LogType {
  chalk: Chalk
  label: string
}

const log = console.log

// eslint-disable-next-line no-control-regex
const removeAnsi = (text: string) => text.replace(/\x1B\[\d+m|\n/g, '')

const center = (message: string, pl = 0) => {
  const cols = process?.stdout?.columns
  if (!cols) return message

  const messageWithoutAnsi = removeAnsi(message)
  return ' '.repeat((cols - messageWithoutAnsi.length) / 2 + pl) + message
}

const getLine = (count?: number) => {
  const cols = count || process?.stdout?.columns || 53
  return center(chalk.blue('-'.repeat(cols)))
}

const getBorder = () => `\n${getLine()}\n`

const getLogo = () => {
  const logoExtraPadding = 5
  const logoHorizontal = '#'.repeat(logoExtraPadding + 2)

  const logoGreenHorizontal = chalk.green(logoHorizontal)
  const logoBlueHorizontal = chalk.blue(logoHorizontal)

  return (
    center(logoGreenHorizontal + '\n', logoExtraPadding) +
    center(`${logoBlueHorizontal}   ${logoGreenHorizontal}\n`) +
    center(logoBlueHorizontal + '\n\n', 0 - logoExtraPadding) +
    center(chalk.blue('#'.repeat(logoExtraPadding)) + '\n').repeat(4)
  )
}

const printLog = (message: string, type: LogType) => {
  const border = getBorder()
  const label = type.chalk.bold(` ${type.label} `)

  const padding = ' '.repeat(removeAnsi(label).length)
  const space = ' '.repeat(3)

  log(border)
  log(`${label}${space}${message.split('\n').join(`\n${padding}${space}`)}`)
  log(border)
}

export const TatumLogger = {
  info: (message: string) => printLog(message, { chalk: chalk.bgGreen, label: 'INFO' }),

  warning: (message: string) => printLog(message, { chalk: chalk.bgYellow, label: 'WARNING' }),

  error: (message: string) => printLog(message, { chalk: chalk.bgRed, label: 'ERROR' }),

  welcome: () => {
    const titleLine = getLine(21)
    const border = getBorder()

    log(border)
    log(getLogo())

    log(titleLine)
    log(center(chalk.green(' Welcome to Tatum! 👋')))
    log(titleLine, '\n')

    log(center('The complete SDK for Web3 development!\n'))
    log(center(`Random line with ${chalk.yellow('highligt')} for illustration purpose...`))
    log(center(`Random line with ${chalk.red('warning')} for illustration purpose...\n`))

    log(center(`Explore all SDK capabilities at ${chalk.cyan('https://docs.tatum.io')}`))
    log(border)
  },
}
