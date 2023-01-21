import { Scene, Layer, Structs } from '@phaser-plus/core'
import GameObject2D from './GameObject2D'
import DepthSort from './DepthSort'
import Grid from './Grid'

/**
 * @typedef GridColors
 * @property {number} background
 * @property {number} lines
 */

class World extends Layer {

    /**
     * @private
     * @type {Grid}
     */
    grid = null

    /** @private */
    gridUpdate = null

    /**
     * @private
     * @type {Structs.Matrix2}
     */
    _projection = Structs.Matrix2.create(50, 50)

    sort = new DepthSort()

    /** @protected */
    onCreate() {
        this.grid = new Grid(this.scene, 0, 0)
        this.grid.depth = -Number.MAX_SAFE_INTEGER
        this.scene.add.existing(this.grid)
        this.grid.onCreate()
        this.grid.setScrollFactor(0)
        this.grid.setVisible(false)

        super.onCreate()
        this.onLayerUpdate()
    }

    /**
     * @protected
     */
    onLayerUpdate() {
        super.onLayerUpdate()
        this.grid.cameraFilter = this.container.cameraFilter
        this.grid.move(this.camera)

        if (this.gridUpdate !== null) {
            this.grid.setVisible(this.gridUpdate)
            if (this.gridUpdate) {
                this.grid.setProjection(this._projection)
            }
            this.gridUpdate = null
        }
        this.container.list.sort(this.sort.fn)

        if (typeof this.scene.matter !== 'undefined') {
            if (typeof this.scene.matter.world.debugGraphic !== 'undefined') {
                this.scene.matter.world.debugGraphic.cameraFilter = this.container.cameraFilter
            }
        }
    }

    /** @protected */
    onDestroy() {
        super.onDestroy()
    }

    /**
     * 
     * @param {boolean} flag 
     * @param {GridColors} [colors]
     */
    debug(flag = true, colors = {}) {
        if (typeof colors === 'object') {
            this.grid.setColors(colors.background, colors.lines)
        }
        if (typeof flag !== 'boolean') {
            return this
        }
        this.gridUpdate = null
        if (this.grid.visible === flag) {
            return this
        }

        this.gridUpdate = flag
    }

    /**
     * 
     * @param {Structs.Matrix2} matrix 
     */
    set projection(matrix) {
        this._projection.setValues(matrix.v00, matrix.v01, matrix.v10, matrix.v11)
        this.sort.setup()
        this.list.forEach(object => {
            object.setTransform(object.transform.x, object.transform.y)
        })
        if (this.grid.visible) {
            this.gridUpdate = true
        }
        return this._projection
    }

    get projection() {
        return this._projection
    }

    /**
     * @param {string} key 
     * @param {new GameObject2D} gameObjectClass 
     */
    register(key, gameObjectClass) {
        this.scene.pool.register(key, gameObjectClass, this.createInstanceFn)
        return this
    }

    /**
     * @template {GameObject2D} T
     * @param {string} key 
     * @param {number} x 
     * @param {number} y 
     * @param {Array<string>} tags
     * @returns {T}
     */
    add(key, x, y) {
        /** @type {GameObject2D} */
        let object = this.scene.pool.obtain(key)
        if (object === null) {
            return null
        }
        this.container.add(object)
        object.setTransform(x, y)
        return object
    }

    /**
     * @template {GameObject2D} T
     * @param {T} gameObject 
     */
    remove(gameObject) {
        this.container.remove(gameObject)
        this.scene.pool.release(gameObject)
        return this
    }

    /**
     * @private
     * @param {string} _ 
     * @param {new GameObject2D} gameObjectClass 
     * @param {Scene} scene 
     */
    createInstanceFn = (_, gameObjectClass, scene) => {
        let object = new gameObjectClass(scene, this)
        return object
    }

}

export default World