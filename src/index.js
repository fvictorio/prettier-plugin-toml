const parser = require('toml/lib/parser')

const languages = [
  {
    extensions: ['.toml'],
    name: 'TOML',
    parsers: ['toml-parse']
  }
]

const parsers = {
  'toml-parse': {
    parse: text => parser.parse(text),
    astFormat: 'toml-ast'
  }
}

function printToml(path, options, print) {
  return ''
}

const printers = {
  'toml-ast': {
    print: printToml
  }
}

module.exports = {
  languages,
  parsers,
  printers
}
