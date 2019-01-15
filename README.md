![Rocket Nuimo](https://github.com/pryomoax/nuimo-connect-node/raw/master/assets/rocket-nuimo.png)

Welcome to 🚀 Rocket Nuimo, a Node.js client package for Senic's Numio BLE device. 

⚠️ **THIS PACKAGE IS NOT YET PUBLISHED!** ⚠️

----

#Installation
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

## Node.js 10+ Installation

(If you applied the above macOS fix you can skip this. `noble-mac` does not use `xpc-connection`)

Another issue related to modern version of Node.js with respects to [noble](https://github.com/noble/noble) is with it's depedency on [xpc-connection](https://github.com/sandeepmistry/node-xpc-connection).

### Overridding Depedencies

In *your* project's `package.json` insert the following:

```json
  "depedendencie": {
   "rocket-nuimo": "^0.4"   
  },
  "resolutions": {
    "xpc-connection": "sandeepmistry/node-xpc-connection#pull/26/head"
  },
```

Then run from the terminal

```bash
$ yarn install
```