![Rocket Nuimo](https://github.com/pryomoax/rocket-nuimo-node/raw/master/assets/rocket-nuimo.png)

[![Release](https://img.shields.io/github/release-pre/pryomoax/rocket-nuimo-node.svg?style=for-the-badge)](https://github.com/pryomoax/rocket-nuimo-node/releases)
[![License](https://img.shields.io/github/license/pryomoax/rocket-nuimo-node.svg?style=for-the-badge)](./LICENSE)
![Node](https://img.shields.io/node/v/rocket-nuimo.svg?style=for-the-badge)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/pryomoax/rocket-nuimo-node/graphs/commit-activity)

Welcome to 🚀 Rocket Nuimo, a Node.js client package for Senic's [Numio Control](https://www.senic.com/nuimo-control) BLE device.

⚠️ **THIS PACKAGE IS NOT YET PUBLISHED!** ⚠️

----

# Installation
To install `rocket-nuimo` for use within your project use [yarn](https://yarnpkg.com) or [npm](https://npmjs.com)

```bash
$ yarn add `rocket-nuimo`
```

## macOS Mojave Installation
`rocket-numio` uses [noble](https://github.com/noble/noble) under the hood for communicating with to BLE devices. `nobel` running on Mojavé has issues currently and must be worked around.

Whether you are uses `rocket-numio` as a depedency, or running one of the [example](./examples) you will need to make overrides or adjustments when running on macOS.

### Overridding Depedencies

In *your* project's `package.json` insert the following:

```json
  "depedendencie": {
   "rocket-nuimo": "^0.4"
  },
  "resolutions": {
    "noble": "https://github.com/Timeular/noble-mac"
  }
```

Then run from the terminal

```bash
$ yarn install
```

Now when you run your respect `yarn install` or `npm install` it will the package suitable to running on macOS.