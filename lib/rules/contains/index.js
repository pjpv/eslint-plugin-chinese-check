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
      description: '檢查是否包含中文',
    },
  },
  create: function (context) {
    return {
      TemplateElement: (node) => {
        check(context, node, node.value.raw)
      },
      Literal: (node) => {
        check(context, node, node.raw)
      },
    }
  },
}
