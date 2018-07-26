const crypto = require('crypto');
const {
  compose,
  join,
  pluck,
  map,
  forEachObjIndexed,
  test,
  path,
  forEach,
  reject,
  isEmpty,
  when,
  curry,
  is,
  cond,
} = require('ramda');
const { isArray } = require('ramda-adjunct');

const { singular, plural } = require('pluralize');

const { SOURCE_NAME, DEBUG_MODE } = require('./constants');

// Convert a type name to a formatted plural type name.
exports.formatTypeName = t => `all${plural(t)}`;

// Get the singular type name back from a formatted type name.
const extractTypeName = t => singular(t.replace(/all/, ''));

// Create the query body
const surroundWithBraces = c => `{${c}}`;

// Constructs a query for a given type.
const constructTypeQuery = type => `
  ${formatTypeName(type.name)} {
    ${compose(
      join(`\n`),
      pluck(`name`)
    )(type.fields)}
  }
`;

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
  );

const isCustomNode = test(/^__node__/);
const customNodeName = keyName => keyName.replace('__node__', '');

const liftCustomNodes = (customNodes, data) => {
  forEachObjIndexed((val, key, obj) => {
    const normalKey = customNodeName(key);
    if (test(/^__node__/, key)) {
      cond([
        [isEmpty, () => {}],
        [is(Array), forEach(val => customNodes.push([normalKey, val]))],
        [is(Object), val => customNodes.push([normalKey, val])],
      ])(val);
    }

    if ((is(Object), val)) {
      liftCustomNodes(customNodes, val);
    }
  }, data);

  return customNodes;
};

// Composition which assembles the query to fetch all data.
const assembleQueries = compose(
  surroundWithBraces,
  join(`\n`),
  map(constructTypeQuery),
  path([`__type`, `possibleTypes`])
);

const createNodes = (createNode, reporter) => nodePairs => {
  forEach(pair => {
    const key = pair[0];
    const queryResultNode = pair[1];
    const { id, ...fields } = queryResultNode;

    const { ...nonEmptyFields } = removeEmpties({ ...fields });
    const jsonNode = JSON.stringify(queryResultNode);
    if (id) {
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
    }
  }, nodePairs);
};

module.exports = {
  surroundWithBraces,
  extractTypeName,
  constructTypeQuery,
  createNodes,
  assembleQueries,
  liftCustomNodes,
};
