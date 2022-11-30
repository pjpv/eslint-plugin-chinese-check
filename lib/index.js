/**
 * @fileoverview chinese-check
 * @author greendev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



module.exports = {
  rules: requireIndex(__dirname + "/rules"),
  rulesConfig: {
    'chinese-check': [1, 'S'],
  }
}
