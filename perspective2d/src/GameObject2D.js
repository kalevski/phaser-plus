import { Math } from 'phaser'
import { Scene, GameObject } from '@phaser-plus/core'
import World from './World'

class GameObject2D extends GameObject {

    /**
     * @private
     * @type {World}
     */
    context = null

    transform = new Math.Vector2(0, 0)

    pivot = new Math.Vector2(0, 0)

    /**
     * 
     * @param {Scene} scene 
     * @param {World} context 
     */
    constructor(scene, context) {
        super(scene, 0, 0)
        this.context = context
    }

    get projection() {
        return this.context.projection
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    setTransform(x, y) {
        this.projection.translate(x, y, this)
        this.transform.set(x, y)
        return this
    }

    setTransformX(x) {
        return this.setTransform(x, this.transform.y)
    }

    setTransformY(y) {
        return this.setTransform(this.transform.x, y)
    }

    /**
     * 
     * @param {string} tag 
     */
    addTag(tag) {

        return this
    }

    /**
     * 
     * @param {string} tag 
     */
    removeTag(tag) {

        return this
    }

    removeTags() {}

    /**
     * 
     * @param {number} time 
     * @param {number} delta 
     */
    doUpdate(time, delta) {
        super.doUpdate(time, delta)
        this.projection.inverse.translate(this.x, this.y, this.transform)
        this.pivot.set(this.transform.x, this.transform.y)
    }

}

export default GameObject2D