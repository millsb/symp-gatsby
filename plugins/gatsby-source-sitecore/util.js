const crypto = require('crypto')
const {
  compose,
  join,
  pluck,
  map,
  path,
  forEach,
  reject,
  isEmpty,
  when,
} = require('ramda')
const { isArray } = require('ramda-adjunct')

const { singular, plural } = require('pluralize')

const { SOURCE_NAME, DEBUG_MODE } = require('./constants')

// Convert a type name to a formatted plural type name.
exports.formatTypeName = t => `all${plural(t)}`

// Get the singular type name back from a formatted type name.
const extractTypeName = t => singular(t.replace(/all/, ''))

// Create the query body
const surroundWithBraces = c => `{${c}}`

// Constructs a query for a given type.
const constructTypeQuery = type => `
  ${formatTypeName(type.name)} {
    ${compose(
      join(`\n`),
      pluck(`name`)
    )(type.fields)}
  }
`

const removeEmpties = data =>
  map(
    when(
      isArray,
      compose(
        removeEmpties,
        reject(isEmpty)
      )
    ),
    data
  )

// Composition which assembles the query to fetch all data.
const assembleQueries = compose(
  surroundWithBraces,
  join(`\n`),
  map(constructTypeQuery),
  path([`__type`, `possibleTypes`])
)

const createNodes = (createNode, reporter) => (value, key) => {
  forEach(
    queryResultNode => {
      const { id, ...fields } = queryResultNode

      const { ...nonEmptyFields } = removeEmpties({ ...fields })
      console.log(nonEmptyFields)

      const jsonNode = JSON.stringify(queryResultNode)
      const gatsbyNode = {
        id,
        ...nonEmptyFields,
        parent: `${SOURCE_NAME}_${key}`,
        children: [],
        internal: {
          type: extractTypeName(key),
          content: jsonNode,
          contentDigest: crypto
            .createHash(`md5`)
            .update(jsonNode)
            .digest(`hex`),
        },
      }

      if (DEBUG_MODE) {
        const jsonFields = JSON.stringify(fields)
        const jsonGatsbyNode = JSON.stringify(gatsbyNode)
        reporter.info(`  processing node: ${jsonNode}`)
        reporter.info(`    node id ${id}`)
        reporter.info(`    node fields: ${jsonFields}`)
        reporter.info(`    gatsby node: ${jsonGatsbyNode}`)
      }

      createNode(gatsbyNode)
    },
    [value]
  )
}

module.exports = {
  surroundWithBraces,
  extractTypeName,
  constructTypeQuery,
  createNodes,
  assembleQueries,
}
