const parser = require('toml/lib/parser')
const {
  doc: {
    builders: { concat }
  }
} = require('prettier')

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
  const node = path.getValue()

  if (Array.isArray(node)) {
    return concat(path.map(print))
  }

  switch (node.type) {
    default:
      return ''
  }
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
