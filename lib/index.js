/**
 * @fileoverview chinese-check
 * @author greendev
 */
"use strict";

module.exports = {
  rules: {
    'chinese-check': require('./rules/chinese-check'),
    'contains': require('./rules/contains')
  },
  rulesConfig: {
    'chinese-check': [1, 'S'],
    'contains': 0,
  }
}
