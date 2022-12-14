'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

let rule = require('../../../lib/rules/contains');

let RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

let ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 10,
  },
});

ruleTester.run('contains', rule, {

  valid: [ // 合法示例
    "var a = 'unit test'",
    "console.log('success')",
  ],

  invalid: [ // 不合法示例
    {
      code: "const a = '环境测试'",
      errors: [
        {
          message: '检查到中文',
        },
      ],
    },
    {
      code: "console.log('运行失败')",
      errors: [
        {
          message: '检查到中文',
        },
      ],
    },
  ],
});
