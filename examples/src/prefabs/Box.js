import { GameObject } from '@phaser-plus/core'
import { GameObjects } from 'phaser'

class Box extends GameObject {

    /** @type {GameObjects.Sprite} */
    base = null
    
    onCreate() {
        this.base = this.scene.add.sprite(0, 0, 'objects', 'rectangle_blue')
            .setVisible(false)
        this.add(this.base)
        this.scene.matter.add.gameObject(this)
        this.setBody({
            type: 'rectangle',
            width: 64,
            height: 64
        }, {
            isStatic: true,
            isSensor: false,
            label: 'box'
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

    changeColor() {
        let colors = [ 0xffc107, 0xcfff95, 0xec407a ]
        this.base.setTint(colors[Math.floor(Math.random() * colors.length)])
    }

}

export default Box