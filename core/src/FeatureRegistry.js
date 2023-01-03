import { Broadcast } from '@toolcase/base'
import Feature from './Feature'
import Scene from './Scene'

/**
 * @typedef Newable
 * @template {Feature} T
 */

class FeatureRegistry extends Broadcast {

    /**
     * @private
     * @type {FeatureConstructable<string>}
     */
    scene = null

    /**
     * @private
     * @type {Map<string,Feature>}
     */
    features = new Map()

    /**
     * @private
     * @type {Array<string>}
     */
    featureKeys = []

    /**
     * @private
     */
    dirty = false

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        super()
        this.scene = scene
    }

    get keys() {
        if (this.dirty === false) {
            return this.featureKeys
        }
        this.featureKeys = []
        this.features.forEach((_, key) => this.featureKeys.push(key))
        this.dirty = false
        return this.featureKeys
    }

    /**
     * @template T
     * @param {string} key 
     * @param {new T} featureClass 
     * @returns {T}
     */
    register(key, featureClass) {
        if (this.features.has(key)) {
            throw new Error(`key ${key} is already in use by other feature`)
        }
        if (typeof featureClass !== 'function') {
            throw new Error(`featureClass provided [${featureClass}] is not a class`)
        }
        /** @type {T} */
        let feature = new featureClass(this.scene, key)

        if (!(feature instanceof Feature)) {
            throw new Error(`featureClass must extends Feature class `)
        }
        feature.onCreate()

        this.features.set(key, feature)
        this.dirty = true
        return feature
    }

    /**
     * @template {Feature} T
     * @param {string} key 
     * @returns {T|null}
     */
    get(key) {
        return this.features.get(key) || null
    }

    /**
     * 
     * @param {string} key 
     */
     destroy(key) {
        let feature = this.get(key)
        if (feature === null) {
            return
        }
        feature.preDestroy()
        feature.onDestroy()
        this.features.delete(key)
        this.dirty = true
    }

    destroyAll() {
        for (let key of this.keys) {
            this.destroy(key)
        }
    }

    /**
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    doUpdate(time, delta) {
        for (let key of this.keys) {
            this.get(key).onUpdate(time, delta)
        }
    }

}

export default FeatureRegistry