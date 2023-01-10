import { GameObject } from '@phaser-plus/core'
import { GameObjects } from 'phaser'

class Turtle extends GameObject {
    
    /** @type {GameObjects.Sprite} */
    base = null
    
    onCreate() {
        this.base = this.scene.add.sprite(0, 0, 'objects', 'turtle_left')
            .setVisible(false)
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

        this.scene.matter.world.remove(this.body)
    }

    onAdd() {
        this.scene.matter.world.add(this.body)
        this.base.setVisible(true)
    }

    onRemove() {
        this.scene.matter.world.remove(this.body)
        this.base.setVisible(false)
    }
}

export default Turtle