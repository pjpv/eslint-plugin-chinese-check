'use strict'
const { SC, TC } = require('./constants')
const { scIsMultiple } = require('../multiple/multiple')

function check(cont, node, text, isSimplified, range) {
  // console.log(text)
  const FONT1 = isSimplified ? SC : TC
  const FONT2 = isSimplified ? TC : SC
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
        newText = newText.replace(new RegExp(txt1, 'g'), txt2)
        replaceStr.push({ txt1, txt2 })
      })
      let message = isSimplified ? '檢查到簡體字：' : '检查到繁体字：'
      if (isSimplified) {
        message += replaceStr.map(i => {
          const m = scIsMultiple(i.txt1)
          if (m) {
            return m + '(**多繁)'
          }
          return `${i.txt1}>${i.txt2}`
        }).join(' || ')
      } else {
        message += replaceStr.map(i => `${i.txt1}>${i.txt2}`).join(' || ')
      }
      cont.report({
        node,
        message: message,
        fix: fixer => {
          // console.log(range, text, newText)
          return fixer.replaceTextRange(range, newText)
        }
      })
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: '檢查中文'
    },
    fixable: 'code',
    schema: [{ enum: ['S', 'T'] }]
  },
  create: function(context) {
    const checkType = context.options && context.options.length > 0 && ['S', 'T'].includes(context.options[0]) && context.options[0] || 'S'
    const isSimplified = checkType === 'S'
    const Literal = function (node) {
      if (typeof node.value === 'string') {
        check(context, node, node.raw, isSimplified, node.range)
      }
    }
    const VText = function (node) {
      check(context, node, node.value, isSimplified, node.range)
    }
    const TemplateElement = function (node) {
      const start = node.range[0] + 1
      const end = node.value.raw.length + start
      check(context, node, node.value.raw, isSimplified, [start, end])
    }
    return Object.assign({},
        typeof context.parserServices.defineTemplateBodyVisitor === "function" ? context.parserServices.defineTemplateBodyVisitor({ Literal, VText }) : {},
        { TemplateElement, Literal })
  }
}
