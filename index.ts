/**
 * @module numio-connect
 */

export * from './lib/device/led-glyphs'
export { DeviceCommunicationError, DeviceCommunicationErrorCode } from './lib/errors/device-communication-error'
export { DeviceConnectedState, DisplayBitmapOptions, NuimoDevice } from './lib/device/nuimo-device'
export { DeviceDiscoveryManager, DeviceDiscoveryState } from './lib/discovery/discovery'
export { DeviceDiscoverySession, DeviceDiscoverySessionOptions } from './lib/discovery/discovery-session'
export { FlyDirection, LEDBitmapTransitionEffect, SwipeDirection, TouchArea } from './lib/device/nuimo-device'
export { LEDBitmap, LEDBitmapCompositeMode } from './lib/device/led-bitmap'
export { NuimoError } from './lib/errors/nuimo-error'