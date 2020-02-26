[Rocket Nuimo](../README.md) › [NuimoDeviceCommunicationError](nuimodevicecommunicationerror.md)

# Class: NuimoDeviceCommunicationError

Class of error related to device communication errors with a known device

## Hierarchy

  ↳ [NuimoError](nuimoerror.md)

  ↳ **NuimoDeviceCommunicationError**

## Index

### Constructors

* [constructor](nuimodevicecommunicationerror.md#constructor)

### Properties

* [code](nuimodevicecommunicationerror.md#code)
* [id](nuimodevicecommunicationerror.md#id)
* [message](nuimodevicecommunicationerror.md#message)
* [name](nuimodevicecommunicationerror.md#name)
* [stack](nuimodevicecommunicationerror.md#optional-stack)

## Constructors

###  constructor

\+ **new NuimoDeviceCommunicationError**(`code`: [NuimoDeviceCommunicationErrorCode](../enums/nuimodevicecommunicationerrorcode.md), `id`: string, `message?`: undefined | string): *[NuimoDeviceCommunicationError](nuimodevicecommunicationerror.md)*

*Overrides [NuimoError](nuimoerror.md).[constructor](nuimoerror.md#constructor)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`code` | [NuimoDeviceCommunicationErrorCode](../enums/nuimodevicecommunicationerrorcode.md) | connection error code |
`id` | string | device ID for the connection error  |
`message?` | undefined &#124; string | - |

**Returns:** *[NuimoDeviceCommunicationError](nuimodevicecommunicationerror.md)*

## Properties

###  code

• **code**: *[NuimoDeviceCommunicationErrorCode](../enums/nuimodevicecommunicationerrorcode.md)*

Device error code

___

###  id

• **id**: *string*

Device identifier

___

###  message

• **message**: *string*

*Inherited from [NuimoError](nuimoerror.md).[message](nuimoerror.md#message)*

___

###  name

• **name**: *string*

*Inherited from [NuimoError](nuimoerror.md).[name](nuimoerror.md#name)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [NuimoError](nuimoerror.md).[stack](nuimoerror.md#optional-stack)*
