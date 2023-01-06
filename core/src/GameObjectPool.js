import { ObjectPool } from '@toolcase/base'
import { Logger } from '@toolcase/logging'
import GameObject from './GameObject'
import Scene from './Scene'

/**
 * @template T
 */
class GameObjectPool {

    /**
     * @callback InstanceFn
     * @param {string} key
     * @param {new GameObject} GameObjectClass
     * @param {Scene} scene
     * @returns {T}
     */

    /**
     * @callback ResetFn
     * @param {T} gameObject
     * @returns {void}
     */

    /**
     * @private
     * @type {Scene}
     */
    scene = null

    /**
     * @private
     * @type {Logger}
     */
    logger = null

    /**
     * @private
     * @type {Map<string,ObjectPool<T>>}
     */
    map = new Map()

    /**
     * @param {Scene} scene
     */
    constructor(scene) {
        this.scene = scene
        this.logger = scene.engine.getLogger('pool')
    }

    get keys() {
        let list = []
        this.map.forEach((_, key) => list.push(key))
        return list
    }

    get instances() {
        let instances = 0
        this.map.forEach(pool => {
            instances += pool.instances
        })
        return instances
    }

    /**
     * 
     * @param {string} key 
     * @param {new T} gameObjectClass 
     * @param {InstanceFn} [instanceFn] 
     */
    register(key, gameObjectClass, instanceFn = null, resetFn = null) {
        if (this.map.has(key)) {
            this.logger.error(`game object ${key} is already registered`)
            return this
        }

        if (instanceFn === null) {
            instanceFn = this.createInstance
        }

        let pool = new ObjectPool(gameObjectClass, resetFn, gameObjectClass => instanceFn(key, gameObjectClass, this.scene))
        this.map.set(key, pool)
        return this
    }

    /**
     * @template {T} O
     * @param {string} key 
     * @returns {O}
     */
    obtain(key) {
        let pool = this.map.get(key) || null
        if (pool === null) {
            this.logger.error(`game object ${key} is not registered`)
            return null
        }
        let object = pool.obtain()
        this.onObjectCreate(object)
        return object
    }

    /**
     * 
     * @param {T} object 
     */
    release(object) {
        if (typeof object.release === 'function') {
            object.release()
        } else {
            this.logger.warning('can not be released, the object is not created by the pool', object)
        }
        return this
    }

    dispose() {
        this.map.forEach(pool => {
            pool.dispose()
        })
        this.map.clear()
    }

    /**
     * @private
     * @param {string} key 
     * @param {new T} GameObjectClass 
     * @param {Scene} scene 
     * @returns {T}
     */
    createInstance(key, GameObjectClass, scene) {
        let object = new GameObjectClass(scene)
        return object
    }

    /**
     * @private
     * @param {T} object 
     */
    onObjectCreate(object) {
        if (typeof object.poolable === 'boolean') {
            return
        }
        object.poolable = true
        if (typeof object.onCreate === 'function') {
            object.onCreate()
        }
    }

}

export default GameObjectPool