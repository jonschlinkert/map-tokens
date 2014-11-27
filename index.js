/*!
 * tokens-map <https://github.com/jonschlinkert/tokens-map>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies
 */

var rand = require('randomatic');

/**
 * Expose `Tokens`
 */

module.exports = Tokens;

/**
 * Create an instance of `Tokens` with the given `string`.
 *
 * ```js
 * var Tokens = require('map-tokens');
 * var tokens = new Tokens(string);
 * ```
 *
 * @param {String} `string`
 * @api public
 */

function Tokens(str) {
  this.input = str ? this._input(str) : '';
  this.result = '';
  this.patterns = [];
  this.tokens = {};
}

/**
 * Register a `regex` pattern to use for matching tokens.
 *
 * ```js
 * tokens.pattern(/def/);
 * ```
 *
 * @param {RegExp} `regex`
 * @api public
 */

Tokens.prototype._input = function(str) {
  return str.replace(/(?:^\uFEFF)|\r/g, '');
};

/**
 * Register a `regex` pattern to use for matching tokens.
 *
 * ```js
 * tokens.pattern(/def/);
 * ```
 *
 * @param {RegExp} `regex`
 * @api public
 */

Tokens.prototype.pattern = function(re) {
  this.patterns.push(re);
  return this;
};

/**
 * Run the registered patterns on the `input` string,
 * which inserts tokens in place of matching strings.
 *
 * ```js
 * tokens.extract();
 * // or
 * tokens.extract([/def/]);
 * ```
 *
 * @param {Array} `patterns` Optionally pass an array of regex patterns to use
 * @api public
 */

Tokens.prototype.extract = function(str, patterns) {
  if (Array.isArray(str)) {
    patterns = str;
    str = null;
  }

  str = str || this.input;

  if (typeof str !== 'string') {
    throw new Error('map-tokens#extract expects a string');
  }

  patterns = patterns || this.patterns;
  var len = patterns.length;
  var i = 0;
  var o = {};
  o.tokens = {};

  while (i < len) {
    var re = patterns[i++];
    var match;
    var ii = 0;
    while (match = re.exec(str)) {
      ii++;
      var id = '__TOKEN_ID' + rand('A0', 6) + '__';
      o.tokens[id] = match[0];
      str = str.replace(match[0], id);
    }
    o.content = str;
  }

  this.tokens = o.tokens;
  this.content = o.content;
  return o.tokens;
};

/**
 * Restore previously inserted tokens.
 *
 * ```js
 * tokens.restore();
 * // or
 * tokens.restore(obj);
 * ```
 *
 * @param {Object} `obj` Optionally pass an object with `tokens` and `content` properties to use.
 * @api public
 */

Tokens.prototype.restore = function(str, obj) {
  if (typeof str !== 'string') {
    obj = str;
    str = null;
  }

  str = str || this.content;
  obj = obj || this;

  if (typeof str !== 'string') {
    throw new Error('map-tokens#extract expects a string');
  }

  this.result = str;
  var tokens = obj.tokens;
  var keys = Object.keys(tokens);
  var len = keys.length - 1;
  var i = -1;

  while (i < len && this.result.indexOf('__TOKEN_ID') !== -1) {
    var key = keys[len--];
    this.result = this.result.replace(new RegExp(key, 'g'), tokens[key]);
  }

  return this.result;
};
