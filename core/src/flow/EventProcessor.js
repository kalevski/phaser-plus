import { ObjectPool } from '@toolcase/base'
import Event from './Event'
import FlowProcessor from './FlowProcessor'

class TimerDef {
    /** @type {Event} */
    event = null
    /** @type {string} */
    name = null
    /** @type {number} */
    time = null
    /** @type {any} */
    payload = null
}

class EventProcessor extends FlowProcessor {
    
    /** @private */
    TIMEOUT_FN_NAME = '@toolcase/phaser-plus/timeoutFn'

    /** @private */
    timerDefPool = new ObjectPool(TimerDef)

    /**
     * @private
     * @type {Array<TimerDef>}
     */
    queue = []

    /**
     * @private
     * @type {Map<string,Event>}
     */
    eventMap = new Map()

    /** @type {Array<string>} */
    get keys() {
        let list = []
        this.eventMap.forEach((_, key) => list.push(key))
        return list
    }

    /** @protected */
    onCreate() {}

    /**
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {
        let indices = []
        for (let index = 0; index < this.queue.length; index++) {
            let def = this.queue[index]
            def.time += delta / 1000
            if (def.time > 0) {
                if (def.name === this.TIMEOUT_FN_NAME) {
                    def.event.call(def.payload)
                    indices.unshift(index)
                } else {
                    def.event.onFire(def.payload)
                    indices.unshift(index)
                }
            }
        }
        for (let index of indices) {
            let [ removed ] = this.queue.splice(index, 1)
            this.timerDefPool.release(removed)
        }
    }

    /** @protected */
    onDestroy() {
        this.queue = []
        for (let key of this.eventMap.keys()) {
            this.remove(key)
        }
    }

    /**
     * 
     * @param {string} eventName 
     * @param {new Event} eventClass 
     */
    add(eventName, eventClass) {
        if (this.eventMap.has(eventName)) {
            throw new Error(`event with name=${eventName} is already registered`)
        }
        let event = new eventClass(this.scene)
        if (event.type !== this.eventType) {
            throw new Error(`provided event with type ${event.type}, ${this.eventType} is acceptable`)
        }
        this.eventMap.set(eventName, event)
        event.onCreate()
        return this
    }

    /**
     * 
     * @param {string} eventName 
     */
    remove(eventName) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).onDestroy()
            this.eventMap.delete(eventName)
        }
        return this
    }

    /**
     * 
     * @param {string} eventName 
     * @param {any} payload 
     * @param {number} delay
     */
    trigger(eventName, payload, delay = 0) {
        if (!this.eventMap.has(eventName)) {
            throw new Error(`event name=${eventName} is not registered`)
        }

        if (typeof delay !== 'number' || delay < 0) {
            throw new Error(`delay must be a positive number`)
        }

        let def = this.timerDefPool.obtain()
        def.name = eventName
        def.time = -delay
        def.event = this.eventMap.get(eventName),
        def.payload = payload
        this.queue.push(def)
        return this
    }

    /**
     * 
     * @param {Function} callbackFn 
     * @param {number} [delay] 
     * @returns 
     */
    triggerFn(callbackFn, delay = 0, context = null) {
        if (typeof delay !== 'number' || delay < 0) {
            throw new Error(`delay must be a positive number`)
        }
        if (typeof callbackFn !== 'function') {
            throw new Error(`callbackFn must be a function`)
        }
        let def = this.timerDefPool.obtain()
        def.name = this.TIMEOUT_FN_NAME
        def.time = -delay
        def.event = callbackFn,
        def.payload = context
        this.queue.push(def)
        return this
    }

}

export default EventProcessor