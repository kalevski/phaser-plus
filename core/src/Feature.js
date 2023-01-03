import { Logger } from '@toolcase/logging'
import { Game } from 'phaser'
import Scene from './Scene'

class Feature {

    /**
     * @protected
     * @type {Scene}
     */
    scene = null

    /**
     * @protected
     * @type {Game}
     */
    game = null

    /**
     * @readonly
     * @type {string}
     */
    key = null

    /**
     * @protected
     * @type {Logger}
     */
    logger = null


    /**
     * 
     * @param {Scene} scene
     * @param {string} key 
     */
    constructor(scene, key) {
        this.scene = scene
        this.game = scene.game
        this.key = key
        this.logger = this.scene.engine.getLogger(`feature=${key}`)
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
    preDestroy() {}

    /** @protected */
    onDestroy() {}

    /**
     * @protected
     * @param {*} event 
     * @param  {...any} messages 
     */
    emit(event, ...messages) {
        if (this.scene.features.events.listenerCount(event) === 0) {
            return this.logger.warning(`event=(${event}) is not handled, payload sent:`, ...messages)
        }
        super.emit(event, ...messages)
    }

}

export default Feature