import {  GameObject, Scene } from '@phaser-plus/core'

class Turtle extends GameObject {
    
    /** @type {GameObjects.Sprite} */
    base = null
    
    onCreate() {
        this.base = this.scene.add.sprite(0, 0, 'objects', 'turtle_left')
        this.add(this.base)
        this.scene.matter.add.gameObject(this)
        this.setBody({
            type: 'rectangle',
            width: 200,
            height: 100
        }, {
            isStatic: false,
            isSensor: false,
            label: 'turtle'
        })
    }
}

class CreatePhysicsObjects extends Scene {

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        
        this.matter.world.setBounds()

        this.pool.register('turtle', Turtle)

        let turtle = this.pool.obtain('turtle').setPosition(width / 2, height / 2)
        this.add.existing(turtle)
    }
}

export default CreatePhysicsObjects