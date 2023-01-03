import Scene from '../Scene'
import FlowEngine from './FlowEngine'

class CollisionEvent {

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
    onEnter(bodyA, bodyB, event) {}

    /** @protected */
    onExit(bodyA, bodyB, event) {}

    get type() {
        return 'collision_event'
    }

}

export default CollisionEvent