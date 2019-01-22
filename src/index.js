const parser = require('toml/lib/parser')
const {
  doc: {
    builders: { concat, hardline, group, indent, line, join, softline }
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
    case 'Assign':
      return concat([node.key, ' = ', path.call(print, 'value'), hardline])
    case 'String':
      return `"${node.value}"`
    case 'Boolean':
      return node.value.toString()
    case 'Integer':
      return node.value.toString()
    case 'Date':
      return node.value.toISOString()
    case 'ObjectPath':
      return concat(['[', node.value.join('.'), ']', hardline])
    case 'Array':
      return group(
        concat([
          '[',
          indent(concat([softline, join(concat([',', line]), path.map(print, 'value'))])),
          softline,
          ']'
        ])
      )
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
