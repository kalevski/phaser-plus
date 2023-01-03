import { Scene } from '@phaser-plus/core'
import World from './World'
import LayerUI from './LayerUI'

class Scene2D extends Scene {

    /**
     * @protected
     * @type {LayerUI}
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
        this.ui = this.features.register('ui', LayerUI)
    }

}

export default Scene2D