[Rocket Nuimo - v1.0.0](../README.md) / NuimoDeviceCommunicationError

# Class: NuimoDeviceCommunicationError

Class of error related to device communication errors with a known device

## Hierarchy

* [*NuimoError*](nuimoerror.md)

  ↳ **NuimoDeviceCommunicationError**

## Index

### Constructors

* [constructor](nuimodevicecommunicationerror.md#constructor)

### Properties

* [code](nuimodevicecommunicationerror.md#code)
* [id](nuimodevicecommunicationerror.md#id)

## Constructors

### constructor

\+ **new NuimoDeviceCommunicationError**(`code`: [*NuimoDeviceCommunicationErrorCode*](../enums/nuimodevicecommunicationerrorcode.md), `id`: *string*, `message?`: *string*): [*NuimoDeviceCommunicationError*](nuimodevicecommunicationerror.md)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`code` | [*NuimoDeviceCommunicationErrorCode*](../enums/nuimodevicecommunicationerrorcode.md) | connection error code   |
`id` | *string* | device ID for the connection error    |
`message?` | *string* | - |

**Returns:** [*NuimoDeviceCommunicationError*](nuimodevicecommunicationerror.md)

Inherited from: [NuimoError](nuimoerror.md)

## Properties

### code

• `Readonly` **code**: [*NuimoDeviceCommunicationErrorCode*](../enums/nuimodevicecommunicationerrorcode.md)

Device error code

___

### id

• `Readonly` **id**: *string*

Device identifier
