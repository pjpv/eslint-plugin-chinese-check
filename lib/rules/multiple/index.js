'use strict'
const { isMultiple } = require('./multiple')

function check (cont, node, text) {
  const txt = isMultiple(text, false)
  if (txt) {
    cont.report({
      node,
      message: '檢測到多型字，請自行檢查: ' + txt,
    })
  }
}

module.exports = {
  // eslint-disable-next-line eslint-plugin/prefer-message-ids,eslint-plugin/require-meta-schema,eslint-plugin/require-meta-type
  meta: {
    docs: {
      description: '检查一个简体字对应多个繁体字',
    },
  },
  create: function (context) {
    const Literal = function(node) {
      if (typeof node.value === 'string') {
        check(context, node, node.raw)
      }
    }
    const VText = function(node) {
      check(context, node, node.value)
    }
    const TemplateElement = function(node) {
      check(context, node, node.value.raw)
    }
    return Object.assign({}, context.parserServices.defineTemplateBodyVisitor({ Literal, VText }), { TemplateElement, Literal })
  },
}
