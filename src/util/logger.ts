import chalk from 'chalk'

const log = console.log

export const logWelcomeMessage = () => {
  const logoLineHorizontal = '#######'
  const logoLineVertical = '#####'
  const titleLine = '---------------------'
  const endLine = '-----------------------------------------------------'

  const logoGreenHorizontal = chalk.green(logoLineHorizontal)
  const logoBlueHorizontal = chalk.blue(logoLineHorizontal)
  const logoVertical = chalk.blue(logoLineVertical)

  const logo = `
            ${logoGreenHorizontal}
  ${logoBlueHorizontal}   ${logoGreenHorizontal}
  ${logoBlueHorizontal}

        ${logoVertical}
        ${logoVertical}
        ${logoVertical}
        ${logoVertical}
  `

  log(logo)
  log(chalk.blue(titleLine))
  log(chalk.green(' Welcome to Tatum! 👋'))
  log(chalk.blue(titleLine))
  log('\nThe complete SDK for Web3 development!\n')
  log(`Random line with ${chalk.yellow('highligt')} for illustration purpose...`)
  log(`Random line with ${chalk.red('warning')} for illustration purpose...\n`)
  log(`Explore all SDK capabilities at ${chalk.cyan('https://docs.tatum.io')}\n`)
  log(`${chalk.blue(endLine)}\n`)
}
