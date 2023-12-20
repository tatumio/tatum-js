import chalk from 'chalk'

type Color = 'yellow' | 'green' | 'cyan' | 'red' | 'blue'

type LogType = 'error' | 'warning' | 'info'

const log = console.log

const isBrowser = () => typeof window !== 'undefined'

// eslint-disable-next-line no-control-regex
const removeAnsi = (text: string) => text.replace(/\x1B\[\d+m|\n/g, '')

const getRandomStr = (strs: string[]) => strs[Math.floor(Math.random() * strs.length)]

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
  const messageWithoutAnsi = removeAnsi(message)
  const align = ((process?.stdout?.columns || 0) - (messageWithoutAnsi?.length || 0)) / 2

  if (!align || align <= pl) return message

  try {
    return ' '.repeat(align + pl) + message
  } catch {
    return message
  }
}

const colorize = (message: string, color: Color, block?: boolean) => {
  if (isBrowser()) {
    return `%c${message}%c`
  }
  return block ? chalk.bgKeyword(color).bold.white(message) : chalk[color](message)
}

const link = (message: string) => colorize(message, 'cyan')

const highlight = (message: string) => colorize(message, 'yellow')

const getLine = (count?: number) => {
  const cols = count || process?.stdout?.columns || 53
  return center(chalk.blue('-'.repeat(cols)))
}

const getBorder = () => `\n${getLine()}\n`

const getLogo = () => {
  if (isBrowser()) {
    return '%c Tatum %c '
  }

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

const printLog = (message: string, type: LogType, url?: string) => {
  const config = getConfigByType(type)

  const label = colorize(` ${config.label} `, config.color, true)

  if (isBrowser()) {
    log(
      `${getLogo()} ${label}\n\n${message}${url}`,
      getStyleByType(),
      undefined,
      getStyleByType(type),
      undefined,
    )
  } else {
    const border = getBorder()

    log(border)
    log(`${label} ${message}${url ? link(url) : ''}`)
    log(border)
  }
}

export const TatumLogger = {
  info: (message: string, url?: string) => printLog(message, 'info', url),
  warning: (message: string, url?: string) => printLog(message, 'warning', url),
  error: (message: string, url?: string) => printLog(message, 'error', url),
  welcome: (keyProvided: boolean, err?: boolean) => {
    const logo = getLogo()
    const hello = ' Welcome to Tatum! 👋'

    const start = err
      ? `Kick off your development journey by making your first call with ${highlight('Tatum')} - ${link(
          'https://tatum-get-started.io',
        )}`
      : getRandomStr([
          `Kickstart your development journey with Tatum, check out the ${highlight(
            'available features',
          )} - ${link('https://tatum-features.io')}`,
          `The possibilities are endless, explore ${highlight(
            'applications',
          )} you can build with Tatum - ${link('https://tatum-applications.io')}`,
        ])

    const dashboard = keyProvided
      ? `Effortlessly track your usage & insights on your ${highlight('Tatum Dashboard')} - ${link(
          'https://tatum-dashboard-usage.io',
        )}`
      : `Unlock higher limits: Generate an API Key by accessing your ${highlight('Dashboard')} - ${link(
          'https://tatum-dashboard.io',
        )}`

    const features = `Try our new ${highlight('Tatum Faucets')} to get ${highlight(
      'Testnet Tokens',
    )} for free on over 5 chains - ${link('https://tatum-faucets.io')}`

    if (isBrowser()) {
      log(
        `${logo}${hello}\n\n${start}\n\n${dashboard}\n\n${features}`,
        getStyleByType(),
        '',
        getStyleByColor('yellow'),
        '',
        '',
        '',
        getStyleByColor('yellow'),
        '',
        '',
        '',
        getStyleByColor('yellow'),
        '',
        getStyleByColor('yellow'),
        '',
        '',
        '',
      )
    } else {
      const titleLine = getLine(21)
      const border = getBorder()

      log(border)
      log(logo)

      log(titleLine)
      log(center(chalk.green(hello)))
      log(titleLine, '\n')

      log(center(start), '\n')
      log(center(dashboard), '\n')
      log(center(features))

      log(border)
    }
  },
}
