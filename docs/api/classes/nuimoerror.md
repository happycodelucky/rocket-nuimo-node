[Rocket Nuimo](../README.md) › [NuimoError](nuimoerror.md)

# Class: NuimoError

Generic error message for all Nuimo errors

## Hierarchy

* [Error](nuimoerror.md#static-error)

  ↳ **NuimoError**

  ↳ [NuimoDeviceCommunicationError](nuimodevicecommunicationerror.md)

## Index

### Constructors

* [constructor](nuimoerror.md#constructor)

### Properties

* [message](nuimoerror.md#message)
* [name](nuimoerror.md#name)
* [stack](nuimoerror.md#optional-stack)
* [Error](nuimoerror.md#static-error)

## Constructors

###  constructor

\+ **new NuimoError**(`message`: string, `name`: string): *[NuimoError](nuimoerror.md)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`message` | string | - | error message |
`name` | string | "NuimoError" | name given to the error  |

**Returns:** *[NuimoError](nuimoerror.md)*

## Properties

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

*Overrides [NuimoError](nuimoerror.md).[stack](nuimoerror.md#optional-stack)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*
