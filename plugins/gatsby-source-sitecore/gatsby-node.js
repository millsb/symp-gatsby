const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const glob = require('glob')
const { GraphQLClient } = require('graphql-request')
const { forEachObjIndexed } = require('ramda')
const { createNodes } = require('./util')
const { DEBUG_MODE } = require('./constants')
const { keywordsError, checkForFaultyFields } = require('./faulty-keywords')

exports.sourceNodes = async (
  { boundActionCreators, reporter },
  { endpoint, token, queries, origin }
) => {
  const readFile = promisify(fs.readFile)
  if (queries) {
    const { createNode } = boundActionCreators

    const clientOptions = {
      headers: {
        Origin: origin || '',
        sc_apikey: token,
      },
    }

    const queryFiles = glob.sync(queries)

    queryFiles.forEach(async qPath => {
      const resolvedPath = path.resolve(qPath)
      const query = await fs.readFileSync(resolvedPath, 'utf-8')
      const client = new GraphQLClient(endpoint, clientOptions)

      const userQueryResult = await client.request(query)

      // Keywords workaround
      if (checkForFaultyFields(userQueryResult)) {
        reporter.panic(`gatsby-source-sitecore: ${keywordsError}`)
      }

      if (DEBUG_MODE) {
        const jsonUserQueryResult = JSON.stringify(
          userQueryResult,
          undefined,
          2
        )
        console.log(
          `\ngatsby-source-graphcms: GraphQL query results: ${jsonUserQueryResult}`
        )
      }
      forEachObjIndexed(createNodes(createNode, reporter), userQueryResult)
    })
  } else {
    reporter.panic(
      `gatsby-source-graphcms: you need to provide a GraphQL query in the plugin 'query' parameter`
    )
  }
}
