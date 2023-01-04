import { GameObject2D, Scene2D } from '@phaser-plus/perspective2d'
import { Debugger } from '@phaser-plus/debugger'
import { Flow } from '@phaser-plus/core'
import { GameObjects } from 'phaser'

class SimpleObj extends GameObject2D {

    /**
     * @type {GameObjects.Graphics}
     */
    canvas = null

    onCreate() {
        this.canvas = this.scene.add.graphics()
        this.add(this.canvas)

        this.canvas.fillStyle(0xffffff, 1)
        this.canvas.fillCircle(0, 0, 10)
    }

}

class SimpleEvent extends Flow.Event {

    onFire() {
        console.log('here ?')
    }

}

class HelloWorld extends Scene2D {

    onInit() {
        this.world.debug()
    }

    onLoad() {
        
    }

    onCreate() {
        let debug = this.features.register('debugger', Debugger)
        this.flow.events.add('simple', SimpleEvent)

        this.world.register('circle', SimpleObj)

        let circle = this.world.add('circle', 0, 0)

        debug.inspect(circle.canvas)
        circle.setName('circle1')
    }

    onDestroy() {
        
    }

}

export default HelloWorld