import { GameObject2D } from '@phaser-plus/perspective2d'
import { GameObjects } from 'phaser'

class Fireplace2D extends GameObject2D {
    
    /** @type {GameObjects.Sprite} */
    base = null

    onCreate() {
        this.base = this.scene.add.sprite(0, 0, 'objects', 'fireplace')
            .setOrigin(.5, 1)

        this.add(this.base)
    }
}

export default Fireplace2D