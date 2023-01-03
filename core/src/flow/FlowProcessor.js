import Scene from '../Scene'

class FlowProcessor {

    /**
     * @protected
     * @type {Scene}
     */
    scene = null

    /**
     * @protected
     * @type {string}
     */
    eventType = null

    /**
     * 
     * @param {Scene} scene 
     * @param {string} eventType 
     */
    constructor(scene, eventType) {
        this.scene = scene
        this.eventType = eventType
    }

    /** @protected */
    onCreate() {}

    /**
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {}

    /** @protected */
    onDestroy() {}

}

export default FlowProcessor