import { GameObject2D } from '@phaser-plus/perspective2d'
import { GameObjects } from 'phaser'

class RoundTable2D extends GameObject2D {

    /** @type {GameObjects.Sprite} */
    base = null

    onCreate() {
        this.base = this.scene.add.sprite(0, 0, 'objects', 'round_table')

        this.add(this.base)
    }

}

export default RoundTable2D
