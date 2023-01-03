/**
 * @typedef EventOptions
 * @property {number} delay
 * @property {number} loop
 */

import { Logger } from '@toolcase/logging'
import { Time } from 'phaser'
import Scene from '../Scene'
import FlowProcessor from './FlowProcessor'
import EventProcessor from './EventProcessor'
import TimeEventProcessor from './TimeEventProcessor'
import CollisionEventProcessor from './CollisionEventProcessor'
import JobProcessor from './JobProcessor'

class FlowEngine {

    active = true

    /**
     * @protected
     * @type {Scene}
     */
    scene = null

    /** @type {EventProcessor} */
    events = null

    /** @type {TimeEventProcessor} */
    timer = null

    /** @type {CollisionEventProcessor|null} */
    physics = null

    /** @type {JobProcessor} */
    jobs = null

    /**
     * @protected
     * @type {Time.TimerEvent}
     */
    timeLoop = null

    /**
     * @protected
     * @type {Logger}
     */
    logger = null

    /**
     * @private
     * @type {Array<FlowProcessor>}
     */
    processors = []

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        this.scene = scene
        this.logger = this.scene.engine.getLogger('flow')
        this.events = this.addProcessor('event', EventProcessor)
        this.timer = this.addProcessor('time_event', TimeEventProcessor)
        this.jobs = this.addProcessor('job', JobProcessor)
        if (typeof this.scene.matter !== 'undefined') {
            this.physics = this.addProcessor('collision_event', CollisionEventProcessor)
        }
    }

    /**
     * @template {FlowProcessor} T
     * @param {string} eventType 
     * @param {new T} processorClass 
     * @returns {T}
     */
    addProcessor(eventType, processorClass) {
        if (typeof eventType !== 'string') {
            throw new Error(`event type must be a string, ${typeof eventType} provided`)
        }
        let processor = this.getProcessor(eventType)
        if (processor !== null) {
            return this.logger.warning(`event type: ${eventType} already have a processor`)
        }
        processor = new processorClass(this.scene, eventType)
        processor.onCreate()
        this.processors.push(processor)
        return processor
    }

    /**
     * @template {FlowProcessor} T
     * @param {string} eventType
     * @returns {T|null}
     */
    getProcessor(eventType) {
        return this.processors.find(procesor => procesor.eventType === eventType) || null
    }

    destroy() {
        while(this.processors.length > 0) {
            let processor = this.processors.pop()
            processor.onDestroy()
        }
    }

    /** @private */
    doUpdate(time, delta) {
        if (this.active === false) {
            return
        }
        for (let procesor of this.processors) {
            procesor.onUpdate(time, delta)
        }   
    }

}

export default FlowEngine