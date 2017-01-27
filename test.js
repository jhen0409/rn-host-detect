'use strict'

var assert = require('assert')
var getHost = require('.')
var host = '10.0.3.2'

// window is undefined
assert.equal(getHost('localhost'), 'localhost')
assert.equal(getHost('127.0.0.1'), '127.0.0.1')
assert.equal(getHost('192.168.1.111'), '192.168.1.111')

// Expected `window.__fbBatchedBridgeConfig.remoteModuleConfig` on React Native
global.window = {
  __fbBatchedBridgeConfig: {
    remoteModuleConfig: [
      [],
      ['AndroidConstants', { ServerHost: host + ':8081' }],
    ],
  },
}
assert.equal(getHost('localhost'), host)
assert.equal(getHost('127.0.0.1'), host)
assert.equal(getHost('192.168.1.111'), '192.168.1.111')
