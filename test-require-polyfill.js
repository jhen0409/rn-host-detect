'use strict'

var assert = require('assert')
var sinon = require('sinon')
var getHost = require('./index')
var host = '10.0.3.2'

// window is undefined, use __fbBatchedBridgeConfig
assert.equal(getHost('localhost'), 'localhost')
assert.equal(getHost('127.0.0.1'), '127.0.0.1')
assert.equal(getHost('192.168.1.111'), '192.168.1.111')

console.warn = sinon.spy(console.warn)

// Expected `window.require` on React Native
global.window = {
  __DEV__: true,
  require: function(moduleName) {
    // https://github.com/facebook/react-native/blob/5403946f098cc72c3d33ea5cee263fb3dd03891d/packager/src/Resolver/polyfills/require.js#L97
    console.warn(
      "Requiring module '" +
        moduleName +
        "' by name is only supported for " +
        'debugging purposes and will BREAK IN PRODUCTION!'
    )
    if (moduleName !== 'NativeModules') return undefined
    return {
      PlatformConstants: { ServerHost: host + ':8081' },
    }
  },
}
global.__fbBatchedBridgeConfig = {}

assert.equal(getHost('localhost'), host)
assert.equal(getHost('127.0.0.1'), host)
assert.equal(getHost('192.168.1.111'), '192.168.1.111')

assert.equal(console.warn.called, false)
