import Scene from '../Scene'
import FlowEngine from './FlowEngine'

class TimeEvent {

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

    /**
     * @protected
     * @param {number} times 
     */
    onFire(times) {}

    get type() {
        return 'time_event'
    }

}

export default TimeEvent