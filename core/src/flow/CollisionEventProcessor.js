import { AdjacencyMatrix } from '@toolcase/base'
import { Logger } from '@toolcase/logging'
import { Physics } from 'phaser'
import CollisionEvent from './CollisionEvent'
import FlowProcessor from './FlowProcessor'

class CollisionEventProcessor extends FlowProcessor {

    /**
     * @private
     * @type {Map<string,CollisionEvent>}
     */
    eventMap = new Map()

    /**
     * @private
     * @type {Logger}
     */
    logger = null

    /**
     * @private
     * @type {AdjacencyMatrix<string,null>}
     */
    matrix = null

    /** @protected */
    onCreate() {
        this.logger = this.scene.engine.getLogger('collision events')
        this.matrix = new AdjacencyMatrix([], null)
        this.scene.matter.world.on(Physics.Matter.Events.COLLISION_START, this.onCollisionEnter, this)
        this.scene.matter.world.on(Physics.Matter.Events.COLLISION_END, this.onCollisionExit, this)
    }

    /**
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {}

    /** @protected */
    onDestroy() {
        for (let key of this.eventMap.keys()) {
            this.removeEvent(key)
        }
    }

    /**
     * 
     * @param {string} eventName
     * @param {new CollisionEvent} collisionEventClass 
     */
    createEvent(eventName, collisionEventClass) {
        if (this.eventMap.has(eventName)) {
            this.logger.warning(`[createEvent] collision event for object ${eventName} is already registered`)
            return this
        }
        let event = new collisionEventClass(this.scene)
        if (event.type !== this.eventType) {
            this.logger.warning(`[createEvent] provided event with type ${event.type}, ${this.eventType} is acceptable`)
            return this
        }
        this.eventMap.set(eventName, event)
        event.onCreate()
        return this
    }

    /**
     * 
     * @param {string} eventName 
     */
    removeEvent(eventName) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).onDestroy()
            this.eventMap.delete(eventName)
        } else {
            this.logger.warning(`provided event with type ${event.type}, ${this.eventType} is acceptable`)
            return this
        }
        return this
    }

    /**
     * 
     * @param {string} labelA 
     * @param {string} labelB 
     * @param {string} eventName 
     */
    setCollision(labelA, labelB, eventName) {
        if (!this.eventMap.has(eventName)) {
            this.logger.warning(`[setCollision] event name=${eventName} does not exist`)
            return this
        }
        this.matrix.addVertex(labelA)
        this.matrix.addVertex(labelB)
        this.matrix.addEdge(labelA, labelB, eventName)
        this.matrix.addEdge(labelB, labelA, eventName)
        return this
    }

    /**
     * 
     * @param {string} labelA 
     * @param {string} labelB 
     * @param {string} eventName 
     */
    removeCollision(labelA, labelB) {
        this.matrix.removeEdge(labelA, labelB)
        this.matrix.removeEdge(labelB, labelA)
    }

    /**
     * @private
     * @param {Physics.Matter.Events.CollisionStartEvent} event 
     * @param {MatterJS.BodyType} bodyA 
     * @param {MatterJS.BodyType} bodyB 
     */
    onCollisionEnter(event, bodyA, bodyB) {
        let eventName = this.matrix.getEdge(bodyA.label, bodyB.label)
        if (eventName === null) {
            return
        }
        let collisionEvent = this.eventMap.get(eventName) || null
        if (collisionEvent === null) {
            this.logger.warning(`[on collision enter] event ${eventName} is not registered`)
            return
        }
        collisionEvent.onEnter(bodyA, bodyB, event)
    }

    /**
     * @private
     * @param {Physics.Matter.Events.CollisionStartEvent} event 
     * @param {MatterJS.BodyType} bodyA 
     * @param {MatterJS.BodyType} bodyB 
     */
    onCollisionExit(event, bodyA, bodyB) {
        let eventName = this.matrix.getEdge(bodyA.label, bodyB.label)
        if (eventName === null) {
            return
        }
        let collisionEvent = this.eventMap.get(eventName) || null
        if (collisionEvent === null) {
            this.logger.warning(`[on collision enter] event ${eventName} is not registered`)
            return
        }
        collisionEvent.onExit(bodyA, bodyB, event)
    }

}

export default CollisionEventProcessor