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
  parser: require.resolve('vue-eslint-parser'),
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
          message: '檢查到簡體字：环>環 || 测>測 || 试>試',
        },
      ],
      output: "const a = '環境測試'"
    },
    {
      code: "console.log('运行失败')",
      errors: [
        {
          message: '檢查到簡體字：运>運 || 败>敗',
        },
      ],
      output: "console.log('運行失敗')"
    },
  ],
});
