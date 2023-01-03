import { generateId } from '@toolcase/base'
import { Game, GameObjects, Math } from 'phaser'
import Scene from './Scene'

class GameObject extends GameObjects.Container {

    /**
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
    id = null

    /** @private */
    _abs = new Math.Vector2(0, 0)

    /**
     * 
     * @param {Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene
        this.game = scene.game
        this.id = generateId(16)
    }

    get absolute() {
        this._abs.set(this.x, this.y)
        let parent = this.parentContainer
        while(parent instanceof GameObjects.GameObject) {
            this._abs.x += parent.x
            this._abs.y += parent.y
            parent = parent.parentContainer
        }
        return this._abs
    }

    /** @protected */
    onCreate() {}

    /**
     * @protected
     * @param {GameObjects.GameObject} parent 
     */
    onAdd(parent) {}

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean}
     */
    contains(x, y) {
        return false
    }

    /**
     * 
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {}

    /**
     * @protected
     * @param {GameObjects.GameObject} parent 
     */
    onRemove(parent) {}

    /** @protected */
    onDestroy() {}

    /** @private */
    preDestroy() {
        super.preDestroy()
        this.onDestroy()
    }

    /**
     * @public
     * @override
     * @param {GameObjects.GameObject | Array<GameObjects.GameObject>} child 
     * @returns {this}
     */
    add(child) {
        super.add(child)
        if (Array.isArray(child)) {
            for (let entity of child) {
                if (entity instanceof GameObject) {
                    entity.onAdd(this)
                }
            }
        } else {
            if (child instanceof GameObject) {
                child.onAdd(this)
            }
        }
        return this
    }

    /**
     * @public
     * @override
     * @param {GameObjects.GameObject | Array<GameObjects.GameObject>} child 
     * @param {boolean} [destroyChild] 
     * @returns {this}
     */
    remove(child, destroyChild = false) {
        if (Array.isArray(child)) {
            for (let entity of child) {
                if (entity instanceof GameObject) {
                    entity.onRemove(this)
                }
            }
        } else {
            if (child instanceof GameObject) {
                child.onRemove(this)
            }
        }
        return super.remove(child, destroyChild)
    }

    /**
     * @public
     * @override
     * @param {boolean} [destroyChild] 
     * @returns {this}
     */
    removeAll(destroyChild = false) {
        for (let child of this.list) {
            if (child instanceof GameObject) {
                child.onRemove(this)
            }
        }
        return super.removeAll(destroyChild)
    }

    /**
     * 
     * @param {number} time 
     * @param {number} delta 
     */
    doUpdate(time, delta) {
        this.onUpdate(time, delta)
        for (let child of this.list) {
            if (child instanceof GameObject) {
                child.doUpdate(time, delta)
            }
        }
    }

}



export default GameObject