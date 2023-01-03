import { Broadcast } from '@toolcase/base'
import { Game } from 'phaser'
import { Scene } from '@phaser-plus/core'

class Panel extends Broadcast {

    /**
     * @protected
     * @type {Scene}
     */
    scene = null

    /**
     * @protected
     * @type {Game}
     */
    game = null

    /**
     * @protected
     */
    base = null

    /** @private */
    _hidden = false

    /**
     * 
     * @param {Scene} scene 
     * @param {Whiteboard} whiteboard 
     */
    constructor(scene, base) {
        super()
        this.scene = scene
        this.game = scene.game
        this.base = base
    }

    /** @protected */
    draw() {}

    /** @protected */
    doUpdate() {}

    /** @protected */
    dispose() {}

}

export default Panel