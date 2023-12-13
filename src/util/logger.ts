import chalk from 'chalk'

type Color = 'yellow' | 'green' | 'cyan' | 'red' | 'blue'

type LogType = 'error' | 'warning' | 'info'

const log = console.log

const isBrowser = () => typeof window !== 'undefined'

// eslint-disable-next-line no-control-regex
const removeAnsi = (text: string) => text.replace(/\x1B\[\d+m|\n/g, '')

const getConfigByType = (type: LogType): { color: Color; label: string } => {
  switch (type) {
    case 'error':
      return { color: 'red', label: 'ERROR' }
    case 'warning':
      return { color: 'yellow', label: 'WARNING' }
    case 'info':
      return { color: 'cyan', label: 'INFO' }
  }
}

const getStyleByType = (type?: LogType) => {
  const common = 'color: white; font-weight: bold;'

  switch (type) {
    case 'error':
      return `${common} background-color: red`
    case 'warning':
      return `${common} background-color: darkorange`
    case 'info':
      return `${common} background-color: steelblue`
    default:
      return `${common} background-image: linear-gradient(126deg,#513bff 9%,#89ffca 97%);`
  }
}

const getStyleByColor = (color: Color) => {
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
  }
}

const center = (message: string, pl = 0) => {
  const cols = process?.stdout?.columns
  if (!cols) return message

  const messageWithoutAnsi = removeAnsi(message)
  return ' '.repeat((cols - messageWithoutAnsi.length) / 2 + pl) + message
}

const colorize = (message: string, color: Color, block?: boolean) => {
  if (isBrowser()) {
    return `%c${message}%c`
  }
  return block ? chalk.bgKeyword(color).bold.white(message) : chalk[color](message)
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
  const config = getConfigByType(type)

  const label = colorize(` ${config.label} `, config.color, true)
  const padding = ' '.repeat(config.label.length + 2)
  const space = ' '.repeat(3)

  const text = `${label}${space}${message.split('\n').join(`\n${padding}${space}`)}`

  if (isBrowser()) {
    log(text, getStyleByType(type), undefined)
  } else {
    const border = getBorder()

    log(border)
    log(text)
    log(border)
  }
}

export const TatumLogger = {
  info: (message: string) => printLog(message, 'info'),

  warning: (message: string) => printLog(message, 'warning'),

  error: (message: string) => printLog(message, 'error'),

  welcome: () => {
    const hello = ' Welcome to Tatum! 👋'
    const title = 'The complete SDK for Web3 development!\n'
    const randomYellow = `Random line with ${colorize('highligt', 'yellow')} for illustration purpose...`
    const randomRed = `Random line with ${colorize('warning', 'red')} for illustration purpose...\n`
    const explore = `Explore all SDK capabilities at ${colorize('https://docs.tatum.io', 'cyan')}`

    if (isBrowser()) {
      log(
        `%c Tatum %c ${hello}\n\n${title}\n${randomYellow}\n${randomRed}\n${explore}`,
        getStyleByType(),
        undefined,
        getStyleByColor('yellow'),
        undefined,
        getStyleByColor('red'),
        undefined,
        undefined,
        undefined,
      )
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
