/**
 * @fileoverview chinese-check
 * @author greendev
 */
"use strict";

module.exports = {
  rules: {
    'chinese-check': require('./rules/chinese-check')
  },
  rulesConfig: {
    'chinese-check': [1, 'S'],
  }
}
