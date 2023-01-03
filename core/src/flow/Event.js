import Scene from '../Scene'
import FlowEngine from './FlowEngine'

class Event {

    /**
     * @protected
     * @type {Scene}
     */
    scene = null

    /**
     * @protected
     * @type {FlowEngine}
     */
    flow = null

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        this.scene = scene
        this.flow = this.scene.flow
    }

    /** @protected */
    onCreate() {}

    /** @protected */
    onFire() {}

    /** @protected */
    onDestroy() {}

    get type() {
        return 'event'
    }

}

export default Event