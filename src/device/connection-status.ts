/**
 * Connection status of a peripheral device
 */
export enum DeviceConnectedStatus {
    /**
     * Disconnected
     */
    Disconnected = 'disconnected',

    /**
     * Connecting and discovering services/characteristics, not yet usable
     */
    Connecting   = 'connecting',

    /**
     * Connected, all services/characteristic subscribed to
     */
    Connected    = 'connected',
}