'use strict'
const { CN, HK } = require('./constants')

function check (cont, node, text) {
  if (typeof text === 'string') {
    // console.log(text)
    let index = -1
    for (let i = 0; i < text.length; i++) {
      const chartIndex = CN.indexOf(text.charAt(i))
      if (chartIndex !== -1) {
        index = chartIndex
        break
      }
    }
    if (index !== -1) {
      const txtCN = CN[index]
      const txtHK = HK[index]
      const newText = `'${text.replaceAll(txtCN, txtHK)}'`
      // console.log('檢查到簡體字：' + txtCN + ' >> ' + txtHK, newText)
      cont.report({
        node,
        message: '檢查到簡體字：' + txtCN + ' >> ' + txtHK,
        fix: fixer => {
          return fixer.replaceText(node, newText)
        },
      })
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: '檢查中文',
    },
    fixable: 'code',
    // 报错信息描述
    messages: {
      avoidMethod: "检查到错误 '{{name}}' ",
    },
  },
  create: function (context) {
    // console.log(context)
    return {
      TemplateElement: (node) => {
        check(context, node, node.raw.value)
      },
      Literal: (node) => {
        check(context, node, node.value)
      },
    }
  },
}
