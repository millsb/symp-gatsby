const crypto = require('crypto');
const uuid = require('uuid/v4');
const {
  compose,
  join,
  pluck,
} = require('ramda');
const { singular, plural } = require('pluralize');
const { SOURCE_NAME, DEBUG_MODE } = require('./constants');

// Convert a type name to a formatted plural type name.
exports.formatTypeName = t => `all${plural(t)}`;

// Get the singular type name back from a formatted type name.
const extractTypeName = t => singular(t.replace(/all/, ''));

// Constructs a query for a given type.
const constructTypeQuery = type => `
  ${formatTypeName(type.name)} {
    ${compose(
      join(`\n`),
      pluck(`name`)
    )(type.fields)}
  }
`;

const buildNode = (createNode, reporter) => nodePair => {
  const key = nodePair[0];
  const queryResultNode = nodePair[1];
  const jsonNode = JSON.stringify(queryResultNode);
  const gatsbyNode = {
    id: uuid(),
    ...queryResultNode,
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
  };

  if (DEBUG_MODE) {
    const jsonFields = JSON.stringify(fields);
    const jsonGatsbyNode = JSON.stringify(gatsbyNode);
    reporter.info(`  processing node: ${jsonNode}`);
    reporter.info(`    node id ${id}`);
    reporter.info(`    node fields: ${jsonFields}`);
    reporter.info(`    gatsby node: ${jsonGatsbyNode}`);
  }

  createNode(gatsbyNode);
};

module.exports = {
  buildNode
};
