import {  Flow, Scene } from '@phaser-plus/core'
import World from './layers/World'
import Box from './prefabs/Box'
import Turtle from './prefabs/Turtle'

class TurtleHitBoxEvent extends Flow.CollisionEvent {

    onEnter(bodyA, bodyB, event) {
        if (bodyA.label === 'box') {
            bodyA.gameObject.changeColor()
        } else if (bodyB.label === 'box') {
            bodyB.gameObject.changeColor()
        }
    }

    onExit(bodyA, bodyB, event) {
        // do something on exit
    }

}

class CollisionEvents extends Scene {

    /** @type {World} */
    world = null

    onInit() {

    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        this.matter.world.setBounds(-width / 2, -height / 2)

        this.pool.register('turtle', Turtle)
        this.pool.register('box', Box)

        this.flow.physics.add('turtle-hit-box', TurtleHitBoxEvent)

        // trigger "turtle-hit-box" collision between physics objects labeled as "turtle" and "box"
        this.flow.physics.setCollision('turtle', 'box', 'turtle-hit-box')

        // check layer implementation [https://github.com/kalevski/phaser-plus/tree/main/examples/src/layers/World.js]
        let world = this.features.register('world', World)

        world.add('box', 0, 200)
        world.add('turtle', 0, -200)
    }

    onDestroy() {
        
    }
}

export default CollisionEvents