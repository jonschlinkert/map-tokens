/*!
 * map-tokens <https://github.com/jonschlinkert/map-tokens>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var _ = require('lodash');
var fs = require('fs');
var Tokens = require('./');

describe('map tokens', function () {
  it('should add the given string to `input`', function () {
    var tokens = new Tokens('abc def ghi jkl');
    tokens.input.should.equal('abc def ghi jkl');
  });

  it('should register a pattern:', function () {
    var tokens = new Tokens('abc def ghi jkl');
    tokens.pattern(/abc/);
    tokens.patterns[0].should.eql(/abc/);
  });

  it('should register multiple patterns:', function () {
    var tokens = new Tokens('abc def ghi jkl');
    tokens.pattern(/abc/);
    tokens.pattern(/ghi/);
    tokens.patterns.should.eql([/abc/, /ghi/]);
  });

  it('should extract tokens using stored patterns:', function () {
    var tokens = new Tokens('abc def ghi jkl');
    tokens.pattern(/def/);
    tokens.pattern(/ghi/);

    var res = tokens.extract();
    var keys = Object.keys(res);

    keys.length.should.equal(2);
    _.values(res).should.eql(['def', 'ghi']);
  });

  it('should extract tokens using the given patterns:', function () {
    var tokens = new Tokens('ac ab abc bca ccb axy');

    var res = tokens.extract([/(a[^ ]+)/g]);
    _.values(res).should.eql(['ac', 'ab', 'abc', 'axy']);
  });

  it('should restore tokens:', function () {
    var tokens = new Tokens('ac hhy ab abc lfa bca ccb axy');

    tokens.extract([/(a[^ ]+)/g]);
    tokens.result.should.equal('');

    tokens.content = tokens.content.replace(/abc|hhy|ccb/g, 'ABC');

    tokens.restore();
    tokens.result.should.equal('ac ABC ab abc lfa bca ABC axy');
  });
});
