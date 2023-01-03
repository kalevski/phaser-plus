import Scene from '../Scene'
import FlowEngine from './FlowEngine'

/**
 * @typedef EventNames
 * @type {'done'|'progress'}
 */

/**
 * @callback ListenerFn
 * @param {Job} job
 * @returns {void}
 */

class Job {

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
     * @protected
     * @type {any}
     */
    payload = null

    /**
     * 
     * @param {Scene} scene 
     * @param {any} payload 
     */
    constructor(scene, payload) {
        this.scene = scene
        this.flow = this.scene.flow
        this.payload = payload
    }

    get type() {
        return 'job'
    }

    /**
     * @protected
     * @param {number} time 
     * @returns {boolean} 
     */
    onUpdate(time) {}

    /**
     * @protected
     */
    onComplete() {}

    /**
     * @protected
     */
    onTerminate() {}

    /** @private */
    onFire() {}

    /** @private */
    onDestroy() {}
    
}

export default Job