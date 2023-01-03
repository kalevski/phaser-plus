import FlowProcessor from './FlowProcessor'
import TimeEvent from './TimeEvent'

/**
 * @typedef TimerDef
 * @property {string} id
 * @property {TimeEvent} event
 * @property {number} current
 * @property {number} interval
 * @property {number} counter
 */

class TimeEventProcessor extends FlowProcessor {

    /**
     * @private
     * @type {Array<TimerDef>}
     */
    timers = []

    /**
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {
        for (let timer of this.timers) {
            timer.current += (delta / 1000)
            if (timer.current > timer.interval) {
                timer.current -= timer.interval
                timer.counter++
                timer.event.onFire(timer.counter)
            }
        }
    }

    /** @protected */
    onDestroy() {
        let ids = this.timers.map(def => def.id)
        for (let id of ids) {
            this.remove(id)
        }
    }

    /**
     * @param {string} id
     * @param {new TimeEvent} timeEventClass 
     * @param {number} interval 
     * @param {number} delay
     */
    add(id, timeEventClass, interval = 1, delay = 0) {
        if (typeof interval !== 'number' || interval <= 0) {
            throw new Error(`interval must be a number greater then 0`)
        }
        if (typeof delay !== 'number' || delay < 0) {
            throw new Error(`interval must be a positive number`)
        }
        let timerDef = this.timers.find(def => def.id === id) || null
        if (timerDef !== null) {
            throw new Error(`timer with id=${id} is already registered`)
        }
        let event = new timeEventClass(this.scene)
        if (event.type !== this.eventType) {
            throw new Error(`provided event with type ${event.type}, ${this.eventType} is acceptable`)
        }
        this.timers.push({
            id: id,
            current: -delay,
            interval: interval,
            event: event,
            counter: 0
        })
        event.onCreate()
        return this
    }

    /**
     * 
     * @param {string} id 
     */
    remove(id) {
        let timerIndex = this.timers.findIndex(def => def.id === id)
        if (timerIndex !== -1) {
            this.timers[timerIndex].event.onDestroy()
            this.timers.splice(timerIndex, 1)
        }
        return this
    }

}

export default TimeEventProcessor