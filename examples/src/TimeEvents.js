import { Flow, Layer, Scene } from '@phaser-plus/core'
import { Debugger } from '@phaser-plus/debugger'
import Turtle from './prefabs/Turtle'

class World extends Layer {

    onCreate() {
        super.onCreate()
        let turtle = this.scene.pool.obtain('turtle')
            .setName('my_turtle')
        this.container.add(turtle)
    }

}

class TurtleJumpEvent extends Flow.TimeEvent {

    turtle = null

    onCreate() {
        let world = this.scene.features.get('world')
        this.turtle = world.getByName('my_turtle')
    }

    onFire() {
        this.turtle.setVelocityY(-5)
    }

}

class TimeEvents extends Scene {

    onInit() {
        this.features.register('debugger', Debugger)
    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        this.matter.world.setBounds(-width / 2, -height / 2)

        this.pool.register('turtle', Turtle)

        this.features.register('world', World)

        this.flow.timer.add('turtle-jump', TurtleJumpEvent, 1, 1)
    }
}

export default TimeEvents