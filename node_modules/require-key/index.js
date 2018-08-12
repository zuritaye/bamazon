var generate = require('escodegen').generate
var resolve = require('browser-resolve')
var esprima = require('esprima')
var through = require('through')
var map = require('map-async')
var astw = require('astw')
var fs = require('fs')

module.exports = function(file) {
  if (/\.json$/.test(file)) return through()

  var buffer = ''

  return through(write, end)

  function write(data) {
    buffer += data
  }

  function end() {
    var ast = esprima.parse(buffer)
    var walk = astw(ast)
    var nodes = []
    var stream = this

    // Discover JSON require calls and their
    // keys.
    walk(function(node) {
      if (!isRequire(node)) return
      var target = node.arguments[0].value

      if (!/\.json$/.test(target)) return
      if (node.parent.type === 'MemberExpression') {
        var keys = []
        var last = node

        while ((node = node.parent), node.property) {
          keys.push(node.property)
          last = node
        }

        nodes.push({
            node: last
          , keys: keys
          , target: target
        })
      }
    })

    if (!nodes.length) {
      stream.queue(buffer)
      stream.queue(null)
      return
    }

    // Resolve the `require` calls for each
    // required JSON file.
    map(nodes, function(node, i, next) {
      resolve(node.target, {
        filename: file
      }, function(err, path) {
        if (err) return next(err)
        node.path = path
        next(null, node)
      })
    }, function(err) {
      if (err) return stream.emit('error', err)

      // Load each JSON file and get their value
      // for their key. Invalid JSON or missing keys
      // will throw, because that's what Node would do!
      map(nodes, function(node, i, next) {
        readJSON(node.path, function(err, data) {
          if (err) return next(err)
          var value = data
          var keys = node.keys
          while (keys.length) {
            value = value[memberValue(keys.shift())]
          }

          value = esprima.parse('('+JSON.stringify(value)+')').body[0].expression
          replaceNode(node.node, value)

          next(null)
        })
      }, function(err) {
        if (err) return stream.emit('error', err)

        stream.queue(generate(ast, {
          format: { indent: { style: '  ' } }
        }))

        stream.queue(null)
      })
    })
  }
}

function readJSON(file, done) {
  return fs.readFile(file, 'utf8', function(err, data) {
    if (err) return done(err)
    try {
      data = JSON.parse(data)
    } catch(e) { return done(e) }
    return done(null, data)
  })
}

function replaceNode(node, replace) {
  for (var key in node) {
    if (node.hasOwnProperty(key)) delete node[key]
  }
  for (var key in replace) {
    if (replace.hasOwnProperty(key)) node[key] = replace[key]
  }

  return node
}

function memberValue(node) {
  return node.type === 'Identifier'
       ? node.name
       : node.value
}

function isRequire(node) {
  var c
  return (c = node.callee)
      && node.type === 'CallExpression'
      && c.type === 'Identifier'
      && c.name === 'require'
      && node.arguments
      && node.arguments[0]
      && node.arguments[0].type === 'Literal'
}
