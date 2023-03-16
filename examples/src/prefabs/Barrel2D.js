import { GameObject2D } from '@phaser-plus/perspective2d'
import { GameObjects } from 'phaser'

class Barrel2D extends GameObject2D {
    
    /** @type {GameObjects.Sprite} */
    stand = null

    /** @type {GameObjects.Sprite} */

    barrel = null
    
    onCreate() {
        this.stand = this.scene.add.sprite(0, 0, 'objects', 'barrel_stand')
        this.barrel = this.scene.add.sprite(0, -40, 'objects', 'barrel_horizontal')

        this.add(this.stand).add(this.barrel)
    }
}

export default Barrel2D