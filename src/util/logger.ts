import chalk from 'chalk'

const log = console.log

const center = (message: string, pl = 0) => {
  const cols = process?.stdout?.columns
  if (!cols) return message

  // eslint-disable-next-line no-control-regex
  const messageWithoutAnsi = message.replace(/\x1B\[\d+m|\n/g, '')
  return ' '.repeat((cols - messageWithoutAnsi.length) / 2 + pl) + message
}

const getLine = (count: number) => center(chalk.blue('-'.repeat(count)))

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

export const generateWelcomeLog = () => {
  const titleLine = getLine(21)
  const border = `\n${getLine(process?.stdout?.columns || 53)}\n`

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
}
