# map-tokens [![NPM version](https://badge.fury.io/js/map-tokens.svg)](http://badge.fury.io/js/map-tokens)

> Register patterns to find tokens in a string and map them to unique IDs, allowing them to be extracted, replaced or restored.

## Install
## Install with [npm](npmjs.org)

```bash
npm i map-tokens --save
```

## Run tests

```bash
npm test
```

## Usage

```js
var Tokens = require('map-tokens');
var tokens = new Tokens('foo "bar" baz quux');

// tokenize anything in double quotes
tokens.pattern(/\"([^\"]+?)\"/);

// replace tokens with temporary IDs
tokens.extract();
//=> 'foo "__TOKEN_IDFOBV3I__" baz quux'

// Run a replacement on the string while the IDs are in place.
// Even though our regex specifies `bar`, `bar` won't be replaced
// since it was replaced with an ID.
tokens.content = tokens.content.replace(/foo|bar/g, 'AAA');
//=> 'AAA "__TOKEN_IDFOBV3I__" baz quux'

// last, retore the tokens
tokens.restore();
console.log(tokens.result);
//=> 'AAA "bar" baz quux'
```

## API
### [Tokens](index.js#L34)

Create an instance of `Tokens` with the given `string`.

* `string` **{String}**    

```js
var Tokens = require('map-tokens');
var tokens = new Tokens(string);
```

### [.pattern](index.js#L52)

Register a `regex` pattern to use for matching tokens.

* `regex` **{RegExp}**    

```js
tokens.pattern(/def/);
```

### [.extract](index.js#L71)

Run the registered patterns on the `input` string, which inserts tokens in place of matching strings.

* `patterns` **{Array}**: Optionally pass an array of regex patterns to use    

```js
tokens.extract();
// or
tokens.extract([/def/]);
```

### [.restore](index.js#L110)

Restore previously inserted tokens.

* `obj` **{Object}**: Optionally pass an object with `tokens` and `content` properties to use.    

```js
tokens.restore();
// or
tokens.restore(obj);
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/map-tokens/issues)

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on November 27, 2014._