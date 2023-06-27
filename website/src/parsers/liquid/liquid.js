import pkg from '@shopify/prettier-plugin-liquid/package.json';

import defaultParserInterface from '../utils/defaultParserInterface'

const ID = 'liquid'

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: 'https://shopify.dev',
  locationProps: new Set(['position', 'blockStartPosition', 'blockEndPosition']),

  defaultParserID: 'liquid',

  async loadParser(callback) {
    const module = require('@shopify/prettier-plugin-liquid/dist/parser/stage-2-ast');
    callback(module);
  },

  parse(parser, code) {
    try {
      return parser.toLiquidHtmlAST(code)
    } catch (message) {
      // AST Explorer expects the thrown error to be an object, not a string.
      throw new SyntaxError(message);
    }
  },

  getNodeName(node) {
    return node.type
  },

  nodeToRange(node) {
    if (node.position) {
      return [node.position.start, node.position.end];
    }
  },

  opensByDefault(node) {
    return node.type === 'Document'
  },

  _ignoredProperties: new Set([
    'source',
  ]),
}
