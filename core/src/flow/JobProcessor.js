import FlowProcessor from './FlowProcessor'
import Job from './Job'

class JobProcessor extends FlowProcessor {

    /**
     * @private
     * @type {Array<Job>}
     */
    queue = []

    get queuedJobs() {
        return this.queue.length
    }

    /** @protected */
    onCreate() {}

    /**
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time) {
        let job = this.queue.shift() || null
        if (job === null) {
            return
        }
        let signal = null
        try {
            signal = job.onUpdate(time)
        } catch (error) {
            return job.onTerminate(error)
        }
        let done = typeof signal === 'boolean' ? signal : false
        if (done === true) {
            job.onComplete()
        } else {
            this.queue.push(job)
        }
    }

    /** @protected */
    onDestroy() {
        while(this.queue.length > 0) {
            let job = this.queue.pop()
            job.onTerminate()
        }
    }

    /**
     * @template {Job} T
     * @param {new T} jobClass 
     * @param {any} payload
     */
    run(jobClass, payload = null) {
        let job = new jobClass(this.scene, payload)

        if (job.type !== this.eventType) {
            throw new Error(`provided job must be an instance of Job class`)
        }
        job.onCreate()
        this.queue.push(job)
        return job
    }

}

export default JobProcessor