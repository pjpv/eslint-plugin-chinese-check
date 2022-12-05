'use strict'
const containsChinese = require('contains-chinese')

function check (cont, node, text) {
  if (typeof text === 'string' && containsChinese(text)) {
    cont.report({
      node,
      message: '检查到中文',
    })
  }
}

module.exports = {
  // eslint-disable-next-line eslint-plugin/prefer-message-ids,eslint-plugin/require-meta-schema,eslint-plugin/require-meta-type
  meta: {
    docs: {
      description: '檢查变量是否包含中文',
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
    return Object.assign({},
        typeof context.parserServices.defineTemplateBodyVisitor === "function" ? context.parserServices.defineTemplateBodyVisitor({ Literal, VText }) : {},
        { TemplateElement, Literal })
  }
}
