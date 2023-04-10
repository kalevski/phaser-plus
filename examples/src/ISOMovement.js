import { Feature, Structs } from '@phaser-plus/core'
import { GameObject2D, Scene2D } from '@phaser-plus/perspective2d'
import { Input } from 'phaser'
import Barrel2D from './prefabs/Barrel2D'
import Fireplace2D from './prefabs/Fireplace2D'
import RoundTable2D from './prefabs/RoundTable2D'

class KeyboardInput extends Feature {

    keys = {
        /** @type {Input.Keyboard.Key} */
        UP: null,
        /** @type {Input.Keyboard.Key} */
        DOWN: null,
        /** @type {Input.Keyboard.Key} */
        LEFT: null,
        /** @type {Input.Keyboard.Key} */
        RIGHT: null
    }

    /** @type {GameObject2D} */
    gameObject2D = null

    onCreate() {
        this.keys.UP = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.UP)
        this.keys.DOWN = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.DOWN)
        this.keys.LEFT = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.LEFT)
        this.keys.RIGHT = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.RIGHT)
    }

    setRef(gameObject2D = null) {
        this.gameObject2D = gameObject2D
    }

    /**
     * 
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {
        if (this.gameObject2D === null) {
            return
        }
        if (this.keys.UP.isDown) {
            this.gameObject2D.setTransformY(this.gameObject2D.transform.y - 0.001 * delta)
        }

        if (this.keys.DOWN.isDown) {
            this.gameObject2D.setTransformY(this.gameObject2D.transform.y + 0.001 * delta)
        }

        if (this.keys.LEFT.isDown) {
            this.gameObject2D.setTransformX(this.gameObject2D.transform.x - 0.001 * delta)
        }

        if (this.keys.RIGHT.isDown) {
            this.gameObject2D.setTransformX(this.gameObject2D.transform.x + 0.001 * delta)
        }
    }

}

class ISOMovement extends Scene2D {

    /** @type {KeyboardInput} */
    keyboardInput = null

    onInit() {
        this.world.projection = Structs.Matrix2.createISO(64)
        this.world.debug()
    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        this.world.register('barrel', Barrel2D)
        this.world.register('fireplace', Fireplace2D)
        this.world.register('round_table', RoundTable2D)

        this.keyboardInput = this.features.register('keyboard_input', KeyboardInput)

        this.world.add('fireplace', 0, 0)
        this.world.add('round_table', 2, 2)
        let barrel = this.world.add('barrel', 6, 2)

        this.keyboardInput.setRef(barrel)

    }

}

export default ISOMovement