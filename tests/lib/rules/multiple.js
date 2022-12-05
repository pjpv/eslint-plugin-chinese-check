'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

let rule = require('../../../lib/rules/multiple');

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

ruleTester.run('multiple', rule, {

  valid: [ // 合法示例
    "var a = '中文'",
    "console.log('運行成功')",
  ],

  invalid: [ // 不合法示例
    {
      code: "const a = '簡體字'",
      errors: [
        {
          message: '檢測到多型字，請自行檢查: T體>(S=体 T=體体)',
        },
      ],
    },
    {
      code: "console.log('繁體字')",
      errors: [
        {
          message: '檢測到多型字，請自行檢查: T體>(S=体 T=體体)',
        },
      ],
    },
  ],
});
