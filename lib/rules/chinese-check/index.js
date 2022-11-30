'use strict'
const { CN, HK } = require('./constants')

function check (cont, node, text, isSimplified) {
  const FONT1 = isSimplified ? CN : HK
  const FONT2 = isSimplified ? HK : CN
  const replaceArr = []
  if (typeof text === 'string') {
    let index = -1
    for (let i = 0; i < text.length; i++) {
      const chartIndex = FONT1.indexOf(text.charAt(i))
      if (chartIndex !== -1) {
        index = chartIndex
        replaceArr.push(index)
      }
    }
    if (replaceArr.length > 0) {
      let newText = text
      const replaceStr = []
      replaceArr.forEach(i => {
        const txt1 = FONT1[i]
        const txt2 = FONT2[i]
        newText = text.replaceAll(txt1, txt2)
        replaceStr.push({ txt1, txt2 })
      })
      cont.report({
        node,
        message: (isSimplified ? '檢查到簡體字：' : '检查到繁体字：') + replaceStr.map(i => `${i.txt1}>${i.txt2}`).join(' || '),
        fix: fixer => {
          return fixer.replaceTextRange([node.start, node.end], newText)
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
  },
  create: function (context) {
    // console.log(context.options)
    const checkType = context.options && context.options.length > 0 && ['S', 'T'].includes(context.options[0]) && context.options[0] || 'S'
    const isSimplified = checkType === 'S'
    return {
      TemplateElement: (node) => {
        check(context, node, node.value.raw, isSimplified)
      },
      Literal: (node) => {
        check(context, node, node.raw, isSimplified)
      },
    }
  },
}
