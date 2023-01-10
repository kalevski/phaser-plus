import {  GameObject, Scene } from '@phaser-plus/core'
import { GameObjects } from 'phaser'

class Turtle extends GameObject {
    
    /** @type {GameObjects.Sprite} */
    base = null
    
    onCreate() {
        this.base = this.scene.add.sprite(0, 0, 'objects', 'turtle_left')
        this.add(this.base)
    }
}

class CreateGameObjects extends Scene {

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        
        this.pool.register('turtle', Turtle)

        let turtle = this.pool.obtain('turtle').setPosition(width / 2, height / 2)
        this.add.existing(turtle)

        // destroy objects
        this.children.remove(turtle)
        this.pool.release(turtle)

        // the same turtle object will be reused if we try to add turtle again
        turtle = this.pool.obtain('turtle').setPosition(width / 2, height / 2)
        this.add.existing(turtle)
    }
}

export default CreateGameObjects