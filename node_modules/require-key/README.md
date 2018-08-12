# require-key [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

A browserify transform that inlines required values from JSON files.

## Usage ##

[![require-key](https://nodei.co/npm/require-key.png?mini=true)](https://nodei.co/npm/require-key)

``` bash
browserify -t require-key index.js > bundle.js
```

Say you have a JSON file you want to require from your browserify bundle, but
you only want to include that *one value* instead of the whole file as a
module. With `require-key` you can, simply:

``` javascript
var version = require('./package.json').version
var through = require('./package.json').dependencies.through
```

Then the transform stream will replace those lines with:

``` javascript
var version = "0.0.0"
var through = "~2.3.4"
```

This works for any JSON file, with any value and any set of keys - provided you
require the file and access its properties like shown above. If you try and
require a malformed file or access undefined values the stream will throw -
that's how Node handles the situation too :)

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/require-key/blob/master/LICENSE.md) for details.
