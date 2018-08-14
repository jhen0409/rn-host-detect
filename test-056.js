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
// global.window = {
//   __DEV__: true,
//   require: function metroRequire(moduleId) {
//     throw new Error('Test error')
//   },
// }
// global.__fbBatchedBridge = {}

// assert.equal(getHost('localhost'), host)
// assert.equal(getHost('127.0.0.1'), host)
// assert.equal(getHost('192.168.1.111'), '192.168.1.111')

// assert.equal(console.warn.called, false)
