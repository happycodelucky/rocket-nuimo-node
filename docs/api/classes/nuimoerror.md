[Rocket Nuimo - v1.1.0](../README.md) / NuimoError

# Class: NuimoError

Generic error message for all Nuimo errors

## Hierarchy

- *Error*

  ↳ **NuimoError**

  ↳↳ [*NuimoDeviceCommunicationError*](nuimodevicecommunicationerror.md)

## Table of contents

### Constructors

- [constructor](nuimoerror.md#constructor)

## Constructors

### constructor

\+ **new NuimoError**(`message`: *string*, `name?`: *string*): [*NuimoError*](nuimoerror.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `message` | *string* | - | error message |
| `name` | *string* | 'NuimoError' | name given to the error |

**Returns:** [*NuimoError*](nuimoerror.md)

Overrides: Error.constructor
