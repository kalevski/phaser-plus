import { ObjectLayer, Scene } from '@phaser-plus/core'
import World from './World'

class Scene2D extends Scene {

    /**
     * @protected
     * @type {ObjectLayer}
     */
    ui = null

    /**
     * @protected
     * @type {World}
     */
    world = null

    /**
     * @protected
     * @override
     */
    beforeInit() {
        this.world = this.features.register('world', World)
        this.ui = this.features.register('ui', ObjectLayer)
    }

}

export default Scene2D