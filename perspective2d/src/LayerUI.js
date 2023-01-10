import { GameObject, Layer } from '@phaser-plus/core'

class LayerUI extends Layer {

    /**
     * 
     * @param {string} key 
     * @param {number} x 
     * @param {number} y 
     */
    add(key, x, y) {
        let object = this.scene.pool.obtain(key)
        object.setPosition(x, y)
        this.container.add(object)
        return this
    }

    /**
     * 
     * @param {GameObject} object 
     */
    remove(object) {
        this.container.remove(object)
        this.scene.pool.release(object)
        return this
    }

}

export default LayerUI