![Rocket Nuimo](https://github.com/pryomoax/rocket-nuimo-node/raw/main/assets/rocket-nuimo.png)

[![License](https://img.shields.io/github/license/pryomoax/rocket-nuimo-node.svg?style=for-the-badge)](./LICENSE)
![Node](https://img.shields.io/npm/v/rocket-nuimo.svg?style=for-the-badge&label=version)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/pryomoax/rocket-nuimo-node/graphs/commit-activity)

🚀 Rocket Nuimo, a Node.js client package for Senic's [Numio Control](https://www.senic.com/nuimo-control) BLE device.

----

# Installation
To install `rocket-nuimo` for use within your project use [yarn](https://yarnpkg.com) or [npm](https://npmjs.com)

```bash
$ yarn add rocket-nuimo
```

----

# APIs

Documentation for the `rocket-nuimo` API are under [docs/api](./docs/api).

# Getting Started

Check out [examples](./examples) to see how to use everything from discovering, display, and eventinbg.

## Getting Connected

```javascript
import { DeviceDiscoveryManager } from 'rocket-nuimo'

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

/**
 * Main application entry point
 */
async function main() {
    console.log('Starting Numio Control discovery')

    // Create a new discovery session
    const session = manager.startDiscoverySession()

    console.log('Waiting for device...')

    // Convenience to await the first discovered Nuimo device
    const device = await session.waitForFirstDevice()

    console.log(`Found device '${device.id}'`)
    console.log('Connecting...')

    // Establish device connection
    if (await device.connect()) {
        console.log('Connected to Nuimo Control')

        //
        // You're connected, observe events and get started...
        //

        // If the device gets disconnected, exit the app
        device.on('disconnect', () => {
            console.log('Disconnected! Exiting.')

            // On a disconnect, exit
            process.exit(0)
        })
    }
}

// Boot strap async function
main().catch((err) => {
  console.log(err)
})
```

## Examples

Clone `rocket-nuimo-node` and run the examples to try things out. [package.json](./package.json) contains many example scripts. Alternatively, for [Visual Sudio Code](https://code.visualstudio.com/) users you have access to the pre-configured launch configurations to run the examples.

```bash
$ git clone https://github.com/pryomoax/rocket-nuimo-node.git
$ cd rocket-nuimo-node
$ yarn install
```

Run one of the following scripts

```bash
# Device discovery
$ yarn device-discovery

# Simple display of custom glyphs
$ yarn display

# Example of simple animation
$ yarn animation

# Selection events
$ yarn select-events

# Touch/Long Touch events
$ yarn touch-events

# Swipe (on device) and through the "fly" touchless gesture
$ yarn swipe-events

# Hover proximity events, through "fly" touchless gestures
$ yarn hover-events

# Dial rotate events
$ yarn rotate-events
```

# Toubleshooting

There can be troubles connecting to a Nuimo when playing around with the device. To give you some leads in trouble shooting, try the following:

- Click the center screen button to wake up Nuimo Control
- Power cycle Nuimo Control
- [Reset bluetooth](https://macpaw.com/how-to/fix-bluetooth-not-available-problem) if on your Mac
- Check if there are any current issue with [noble](https://github.com/noble/noble) related to the OS/Node.js version you are using.

# Special Thanks

Thanks to those making things better with PRs:

* [@Mitch90](https://github.com/Mitch90)
