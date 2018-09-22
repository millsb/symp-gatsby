const axios = require('axios');
const { forEachObjIndexed } = require('ramda');
const { buildNode} = require('./util');
const { DEBUG_MODE } = require('./constants');

exports.sourceNodes = async (
  { boundActionCreators, reporter },
  { services, origin }
) => {
  if (services) {
    const { createNode } = boundActionCreators;
    forEachObjIndexed( async (url, urlKey, services) => {
      try {
        console.log(`Executing Sitecore service query for "${urlKey}"...`);

        const result = await axios.get(url);

        if (DEBUG_MODE) {
          const jsonUserQueryResult = JSON.stringify(
            result,
            undefined,
            2
          );
          console.log(
            `\ngatsby-source-sitecore-service: Query results for ${urlKey} : ${jsonUserQueryResult}`
          );
        }

        buildNode(createNode, reporter)([urlKey, result.data]);
        console.log(`Created ${urlKey} node from Sitecore data.`);

      } catch (err) {
        reporter.panic(`gatsby-source-sitecore-service: ${err}`);
      }
    }, services);
  } else {
    reporter.panic(
      `gatsby-source-sitecore-service: you need to provide at least one service URL inside 'services'`
    );
  };
};
