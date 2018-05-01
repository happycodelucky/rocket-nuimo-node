/**
 * @module numio-connect
 */

export * from './device/led-glyphs'
export { DeviceCommunicationError, DeviceCommunicationErrorCode } from './errors/device-communication-error'
export { DeviceConnectedState, DisplayBitmapOptions, NuimoDevice } from './device/nuimo-device'
export { DeviceDiscoveryManager, DeviceDiscoveryState } from './discovery/discovery'
export { DeviceDiscoverySession, DeviceDiscoverySessionOptions } from './discovery/discovery-session'
export { FlyDirection, LEDBitmapTransitionEffect, SwipeDirection, TouchArea } from './device/nuimo-device'
export { LEDBitmap, LEDBitmapCompositeMode } from './device/led-bitmap'
export { NuimoError } from './errors/nuimo-error'