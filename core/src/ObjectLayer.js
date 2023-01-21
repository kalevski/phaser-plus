import GameObject from './GameObject'
import Layer from './Layer'

class ObjectLayer extends Layer {

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
        return object
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

export default ObjectLayer