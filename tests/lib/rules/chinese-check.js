'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

let rule = require('../../../lib/rules/chinese-check');

let RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 10,
  },
});

ruleTester.run('chinese-check', rule, {

  valid: [ // 合法示例
    "var a = '環境測試'",
    "console.log('運行成功')",
  ],

  invalid: [ // 不合法示例
    {
      code: "const a = '环境测试'",
      errors: [
        {
          message: 'avoidMethod',
        },
      ],
    },
    {
      code: "console.log('运行失败')",
      errors: [
        {
          message: 'avoidMethod',
        },
      ],
    },
  ],
});
