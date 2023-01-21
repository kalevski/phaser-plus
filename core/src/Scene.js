import { Logger } from '@toolcase/logging'
import { Scene as PhaserScene, Scenes } from 'phaser'
import GameObject from './GameObject'
import Engine from './Engine'
import FeatureRegistry from './FeatureRegistry'
import ServiceRegistry from './ServiceRegistry'
import GameObjectPool from './GameObjectPool'
import FlowEngine from './flow/FlowEngine'
import { LAYER_DEPTH_UPDATE } from './Events'

class Scene extends PhaserScene {

    /**
     * @type {Engine}
     */
    engine = null

    /**
     * @type {ServiceRegistry}
     */
    services = null

    /**
     * @type {FeatureRegistry}
     */
    features = null

    /**
     * @type {FlowEngine}
     */
    flow = null

    /**
     * @type {GameObjectPool<GameObject>}
     */
    pool = null

    /**
     * @protected
     * @type {Logger}
     */
    logger = null

    /** @private */
    layerSortFlag = false

    /** @protected */
    onInit() {}

    /** @protected */
    onLoad() {}

    /** @protected */
    onCreate() {}

    /** @protected */
    onDestroy() {}

    /**
     * 
     * @param {string} key 
     * @param {Object<string,any>} payload 
     */
    goTo(key, payload) {
        if (typeof payload !== 'object') {
            payload = null
        }
        this.doDestroy()
        this.scene.stop()
        this.game.scene.start(key, payload)
    }

    /** @type {Object<string,any>} */
    get payload() {
        if (typeof this.scene.settings.data === 'object') {
            return this.scene.settings.data
        } else {
            return {}
        }
    }

    /** @protected */
    beforeInit() {}

    /** @private */
    init() {
        this.engine = this.initializeEngine()
        this.events.once(Scenes.Events.DESTROY, this.doDestroy, this)
        this.logger = this.engine.getLogger(`scene=${this.scene.key}`)
        this.services = this.engine.services
        this.features = new FeatureRegistry(this)
        this.pool = new GameObjectPool(this)
        this.flow = new FlowEngine(this)
        this.logger.info('initialized')

        this.features.on(LAYER_DEPTH_UPDATE, this.onLayerDepthUpdate, this)

        this.beforeInit()
        this.onInit()
    }

    /** @private */
    preload() {
        this.onLoad()
    }

    /** @private */
    create() {
        this.onCreate()
    }

    /**
     * @private
     * @param {number} time 
     * @param {number} delta 
     */
    update(time, delta) {
        if (this.layerSortFlag) {
            this.cameras.cameras.sort(this.compareCamerasFn)
        }
        this.features.doUpdate(time, delta)
        for (let children of this.children.list) {
            if (children instanceof GameObject) {
                children.doUpdate(time, delta)
            }
        }
        this.flow.doUpdate(time, delta)
    }

    /** @private */
    onLayerDepthUpdate() {
        this.layerSortFlag = true
    }

    /** @private */
    compareCamerasFn(cameraA, cameraB) {
        return (cameraA.depth || 0) - (cameraB.depth || 0)
    }

    /** @private */
    doDestroy() {
        this.features.off(LAYER_DEPTH_UPDATE, this.onLayerDepthUpdate, this)

        this.onDestroy()
        this.features.destroyAll()
        this.flow.destroy()
        this.pool.dispose()
    }

    /**
     * @private
     * @returns {Engine}
     */
    initializeEngine() {
        if (this.game.engine instanceof Engine) {
            return this.game.engine
        }
        this.game.engine = new Engine()
        return this.game.engine
    }

}

export default Scene