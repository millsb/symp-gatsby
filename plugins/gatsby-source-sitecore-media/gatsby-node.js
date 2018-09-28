const axios = require('axios');
const { forEachObjIndexed } = require('ramda');
const { buildNode} = require('./util');
const { DEBUG_MODE } = require('./constants');

exports.sourceNodes = async (
  { actions, reporter },
  { imagePaths }
) => {
  if (imagePaths) {
    const { createNode } = actions;
  }
};
