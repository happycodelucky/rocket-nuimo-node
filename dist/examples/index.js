"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const manager = _1.DeviceDiscoveryManager.defaultManager;
exports.bitmap = _1.LEDBitmap.fromBitmapString([
    '   *     ',
    '   **    ',
    '   ***   ',
    '   ****  ',
    '   ***** ',
    '   ****  ',
    '   ***   ',
    '   **    ',
    '   *     ',
]);
async function main() {
    console.log('Starting discovery...');
    const session = manager.startDiscoverySession({
        timeout: 30 * 60
    });
    try {
        console.log('Waiting for device...');
        const device = await session.waitForFirstDevice();
        console.log('Connecting...');
        await device.connect();
        setInterval(() => {
            device.displayBitmap(exports.bitmap, {
                transitionEffect: _1.LEDBitmapTransitionEffect.CrossFade
            });
        }, 1000);
    }
    catch (err) {
        console.error(`${err.message}`);
    }
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUEyRztBQUUzRyxNQUFNLE9BQU8sR0FBRyx5QkFBc0IsQ0FBQyxjQUFjLENBQUE7QUFFeEMsUUFBQSxNQUFNLEdBQUcsWUFBUyxDQUFDLGdCQUFnQixDQUFDO0lBQzdDLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztDQUNkLENBQUMsQ0FBQTtBQUVGLEtBQUs7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDcEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDO1FBQzFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRTtLQUNuQixDQUFDLENBQUE7SUFFRixJQUFJLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDcEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtRQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzVCLE1BQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXRCLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLGNBQU0sRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUsNEJBQXlCLENBQUMsU0FBUzthQUN4RCxDQUFDLENBQUE7UUFDTixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0FBQ0wsQ0FBQztBQUVELElBQUksRUFBRSxDQUFBIn0=