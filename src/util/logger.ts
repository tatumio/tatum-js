import chalk, { Chalk } from 'chalk'

interface LogType {
  chalk: Chalk
  label: string
}

type Color = 'black' | 'white' | 'yellow' | 'green' | 'cyan' | 'red' | 'blue'

const log = console.log

const isBrowser = () => typeof window !== 'undefined'

// eslint-disable-next-line no-control-regex
const removeAnsi = (text: string) => text.replace(/\x1B\[\d+m|\n/g, '')

const getStyleByColor = (color: Color | 'logo') => {
  switch (color) {
    case 'red':
      return 'color: red;'
    case 'blue':
      return 'color: blue;'
    case 'cyan':
      return 'color: cyan;'
    case 'yellow':
      return 'color: yellow;'
    case 'green':
      return 'color: green;'
    default:
      return 'color: white; font-weight: bold; background-image: linear-gradient(126deg,#513bff 9%,#89ffca 97%);'
  }
}

const center = (message: string, pl = 0) => {
  const cols = process?.stdout?.columns
  if (!cols) return message

  const messageWithoutAnsi = removeAnsi(message)
  return ' '.repeat((cols - messageWithoutAnsi.length) / 2 + pl) + message
}

const colorize = (message: string, color: Color) => (isBrowser() ? `%c${message}%c` : chalk[color](message))

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
    const hello = ' Welcome to Tatum! 👋'
    const title = 'The complete SDK for Web3 development!\n'
    const randomYellow = `Random line with ${colorize('highligt', 'yellow')} for illustration purpose...`
    const randomRed = `Random line with ${colorize('warning', 'red')} for illustration purpose...\n`
    const explore = `Explore all SDK capabilities at ${colorize('https://docs.tatum.io', 'cyan')}`

    if (isBrowser()) {
      log(`%c Tatum %c ${hello}`, getStyleByColor('logo'), '')
      log(title)
      log(randomYellow, getStyleByColor('yellow'), '')
      log(randomRed, getStyleByColor('red'), '')
      log(explore, '', '')
    } else {
      const titleLine = getLine(21)
      const border = getBorder()

      log(border)
      log(getLogo())

      log(titleLine)
      log(center(chalk.green(hello)))
      log(titleLine, '\n')

      log(center(title))
      log(center(randomYellow))
      log(center(randomRed))

      log(center(explore))
      log(border)
    }
  },
}
