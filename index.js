'use strict'

/*
 * Get React Native server IP if hostname is `localhost`
 * On Android emulator, the IP of host is `10.0.2.2` (Genymotion: 10.0.3.2)
 */
module.exports = function getHostForRN(hostname) {
  var remoteModuleConfig = typeof window !== 'undefined' &&
    window.__fbBatchedBridgeConfig &&
    window.__fbBatchedBridgeConfig.remoteModuleConfig
  if (
    !Array.isArray(remoteModuleConfig) ||
    hostname !== 'localhost' && hostname !== '127.0.0.1'
  ) return hostname

  var AndroidConstants = (
    remoteModuleConfig.filter(androidConstants)[0] || []
  )[1]
  if (AndroidConstants) {
    var serverHost = AndroidConstants.ServerHost || hostname
    return serverHost.split(':')[0]
  }
  return hostname
}

function androidConstants(config) {
  return config && config[0] === 'AndroidConstants'
}
