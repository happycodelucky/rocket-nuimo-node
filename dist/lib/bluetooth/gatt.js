"use strict";
/**
 * @module nuimo-connect
 *
 * GATT profile constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
//
// Services
//
/**
 * Services available on Nuimo devices
 */
var DeviceService;
(function (DeviceService) {
    DeviceService["BatteryStatus"] = "180f";
    DeviceService["LED"] = "f29b1523cb1940f3be5c7241ecb82fd1";
    DeviceService["Nuimo"] = "f29b1525cb1940f3be5c7241ecb82fd2";
})(DeviceService = exports.DeviceService || (exports.DeviceService = {}));
//
// Service characteristics
//
/**
 * Battery status service characteristics
 */
var BatteryStatusServiceCharacteristic;
(function (BatteryStatusServiceCharacteristic) {
    BatteryStatusServiceCharacteristic["BatteryLevel"] = "2a19";
})(BatteryStatusServiceCharacteristic = exports.BatteryStatusServiceCharacteristic || (exports.BatteryStatusServiceCharacteristic = {}));
/**
 * LED service characteristics
 */
var LEDServiceCharacteristic;
(function (LEDServiceCharacteristic) {
    LEDServiceCharacteristic["LEDMatrix"] = "f29b1524cb1940f3be5c7241ecb82fd1";
})(LEDServiceCharacteristic = exports.LEDServiceCharacteristic || (exports.LEDServiceCharacteristic = {}));
/**
 * Nuimo service characteristics
 */
var NuimoServiceCharacteristic;
(function (NuimoServiceCharacteristic) {
    NuimoServiceCharacteristic["ButtonClick"] = "f29b1529cb1940f3be5c7241ecb82fd2";
    NuimoServiceCharacteristic["Fly"] = "f29b1526cb1940f3be5c7241ecb82fd2";
    NuimoServiceCharacteristic["Rotation"] = "f29b1528cb1940f3be5c7241ecb82fd2";
    NuimoServiceCharacteristic["TouchOrSwipe"] = "f29b1527cb1940f3be5c7241ecb82fd2";
})(NuimoServiceCharacteristic = exports.NuimoServiceCharacteristic || (exports.NuimoServiceCharacteristic = {}));
//
// Characteristic values
//
/**
 * Button click characteristic data values
 */
var ButtonClickCharacteristicData;
(function (ButtonClickCharacteristicData) {
    ButtonClickCharacteristicData[ButtonClickCharacteristicData["Released"] = 0] = "Released";
    ButtonClickCharacteristicData[ButtonClickCharacteristicData["Pressed"] = 1] = "Pressed";
})(ButtonClickCharacteristicData = exports.ButtonClickCharacteristicData || (exports.ButtonClickCharacteristicData = {}));
/**
 * Fly characteristic data values
 */
var FlyCharacteristicData;
(function (FlyCharacteristicData) {
    FlyCharacteristicData[FlyCharacteristicData["Left"] = 0] = "Left";
    FlyCharacteristicData[FlyCharacteristicData["Right"] = 1] = "Right";
    FlyCharacteristicData[FlyCharacteristicData["UpDown"] = 4] = "UpDown";
})(FlyCharacteristicData = exports.FlyCharacteristicData || (exports.FlyCharacteristicData = {}));
/**
 * Touch/Swipe characteristic data values
 */
var TouchOrSwipeCharacteristicData;
(function (TouchOrSwipeCharacteristicData) {
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["SwipeLeft"] = 0] = "SwipeLeft";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["SwipeRight"] = 1] = "SwipeRight";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["SwipeDown"] = 2] = "SwipeDown";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["SwipeUp"] = 3] = "SwipeUp";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["TouchLeft"] = 4] = "TouchLeft";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["TouchRight"] = 5] = "TouchRight";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["TouchBottom"] = 6] = "TouchBottom";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["TouchTop"] = 7] = "TouchTop";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["LongTouchLeft"] = 8] = "LongTouchLeft";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["LongTouchRight"] = 9] = "LongTouchRight";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["LongTouchBottom"] = 10] = "LongTouchBottom";
    TouchOrSwipeCharacteristicData[TouchOrSwipeCharacteristicData["LongTouchTop"] = 11] = "LongTouchTop";
})(TouchOrSwipeCharacteristicData = exports.TouchOrSwipeCharacteristicData || (exports.TouchOrSwipeCharacteristicData = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9ibHVldG9vdGgvZ2F0dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxFQUFFO0FBQ0YsV0FBVztBQUNYLEVBQUU7QUFFRjs7R0FFRztBQUNILElBQVksYUFJWDtBQUpELFdBQVksYUFBYTtJQUNyQix1Q0FBNEIsQ0FBQTtJQUM1Qix5REFBd0QsQ0FBQTtJQUN4RCwyREFBd0QsQ0FBQTtBQUM1RCxDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7QUFFRCxFQUFFO0FBQ0YsMEJBQTBCO0FBQzFCLEVBQUU7QUFFRjs7R0FFRztBQUNILElBQVksa0NBRVg7QUFGRCxXQUFZLGtDQUFrQztJQUMxQywyREFBNEIsQ0FBQTtBQUNoQyxDQUFDLEVBRlcsa0NBQWtDLEdBQWxDLDBDQUFrQyxLQUFsQywwQ0FBa0MsUUFFN0M7QUFFRDs7R0FFRztBQUNILElBQVksd0JBRVg7QUFGRCxXQUFZLHdCQUF3QjtJQUNoQywwRUFBd0QsQ0FBQTtBQUM1RCxDQUFDLEVBRlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFFbkM7QUFFRDs7R0FFRztBQUNILElBQVksMEJBS1g7QUFMRCxXQUFZLDBCQUEwQjtJQUNsQyw4RUFBd0QsQ0FBQTtJQUN4RCxzRUFBd0QsQ0FBQTtJQUN4RCwyRUFBd0QsQ0FBQTtJQUN4RCwrRUFBd0QsQ0FBQTtBQUM1RCxDQUFDLEVBTFcsMEJBQTBCLEdBQTFCLGtDQUEwQixLQUExQixrQ0FBMEIsUUFLckM7QUFFRCxFQUFFO0FBQ0Ysd0JBQXdCO0FBQ3hCLEVBQUU7QUFFRjs7R0FFRztBQUNILElBQVksNkJBR1g7QUFIRCxXQUFZLDZCQUE2QjtJQUNyQyx5RkFBdUIsQ0FBQTtJQUN2Qix1RkFBdUIsQ0FBQTtBQUMzQixDQUFDLEVBSFcsNkJBQTZCLEdBQTdCLHFDQUE2QixLQUE3QixxQ0FBNkIsUUFHeEM7QUFFRDs7R0FFRztBQUNILElBQVkscUJBSVg7QUFKRCxXQUFZLHFCQUFxQjtJQUM3QixpRUFBdUIsQ0FBQTtJQUN2QixtRUFBdUIsQ0FBQTtJQUN2QixxRUFBdUIsQ0FBQTtBQUMzQixDQUFDLEVBSlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFJaEM7QUFFRDs7R0FFRztBQUNILElBQVksOEJBYVg7QUFiRCxXQUFZLDhCQUE4QjtJQUN0Qyw2RkFBdUIsQ0FBQTtJQUN2QiwrRkFBdUIsQ0FBQTtJQUN2Qiw2RkFBdUIsQ0FBQTtJQUN2Qix5RkFBdUIsQ0FBQTtJQUN2Qiw2RkFBdUIsQ0FBQTtJQUN2QiwrRkFBdUIsQ0FBQTtJQUN2QixpR0FBdUIsQ0FBQTtJQUN2QiwyRkFBdUIsQ0FBQTtJQUN2QixxR0FBdUIsQ0FBQTtJQUN2Qix1R0FBdUIsQ0FBQTtJQUN2QiwwR0FBd0IsQ0FBQTtJQUN4QixvR0FBd0IsQ0FBQTtBQUM1QixDQUFDLEVBYlcsOEJBQThCLEdBQTlCLHNDQUE4QixLQUE5QixzQ0FBOEIsUUFhekMifQ==