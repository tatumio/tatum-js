module.exports = function (plop) {
  plop.setGenerator('EMV chain', {
    description: 'Add ENV compatible chain',
    prompts: [
      {
        type: 'input',
        name: 'slug',
        message: 'What is the chain slug? (e.g. For Bitcoin it is btc, based on slug, it will create tatum-btc directory)',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the chain display name? (e.g. For Bitcoin it is Bitcoin)',
      },
      {
        type: 'input',
        name: 'currency',
        message: 'What is the chain currency name? (e.g. For Polygon it is MATIC)',
      },
    ],
    actions: [
      {
        type: 'addMany',
        templateFiles: ['templates/**/**.ts.hbs', 'templates/**/**.js.hbs', 'templates/**/**.json.hbs'],
        destination: './packages/tatum-{{slug}}/',
      },
      {
        type: 'add',
        templateFile: 'templates/npmignore.hbs',
        path: './packages/tatum-{{slug}}/.npmignore',
      },
    ],
  })
}
