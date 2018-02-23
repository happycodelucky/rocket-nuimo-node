import { NuimoLEDMatrix } from './led-matrix'
import { NuimoDevice, LedTransitionEffect } from './device'
import { setTimeout, setImmediate } from 'timers';

// LED matrix rendering options when transition to a new display state
export interface DisplayBitmapAnimationOptions {
    frameDurationMs?: number
    smoothAnimation?: boolean
    repeat?: boolean
}

const animationContext = Symbol('context')

export interface Animation {
    stopAnimation()
}

class AnimationContext {
    animation: 
    animationTimer: NodeJS.Timer
}

/**
 * 
 */
export class DeviceAnimation {
    public readonly frames: NuimoLEDMatrix[]
    private readonly animationOptions: DisplayBitmapAnimationOptions

    constructor(frames: NuimoLEDMatrix[], options?: DisplayBitmapAnimationOptions) {
        this.frames = frames
        this.animationOptions = Object.assign({
            smoothAnimation: false,
            frameDurationMs: 50,
            repeat: false
        }, options)
    }



    animate(device: NuimoDevice): Animation {
        this.stopAnimation()
        
        // Capture current sequence for stop detection
        const sequence = this.animationSequence

        let frame = 0
        const self = this
        this.animationTimer = setImmediate(async () => {
            if (sequence !== self.animationSequence) {
                return
            }
            await self.stepAnimation(frame, device)
            if (sequence !== self.animationSequence) {
                return
            }            

            frame = (frame + 1) % frames.length
            if (!self.animationOptions.repeat && frame === 0) {
                self.stopAnimation()
            }
        }, Math.max(this.animationOptions.frameDurationMs!, 5))
    }

    stopAnimation(animation: Animation) {
        // Increase the sequence for the next animation
        this.animationSequence += 1

        if (this.animationTimer) {
            clearImmediate(this.animationTimer)
            this.animationTimer = undefined
        }
    }

    private async stepAnimation(index: number, device: NuimoDevice): Promise<void> {
        return <Promise<any>> device.displayBitmap(this.frames[index], {
            transitionEffect: index === 0 
                ? LedTransitionEffect.CrossFade 
                : LedTransitionEffect.Immediate,
            brightness: 1.0
        })
    }
}