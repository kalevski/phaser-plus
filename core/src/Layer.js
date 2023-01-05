import { generateId } from '@toolcase/base'
import { GameObjects, Time } from 'phaser'
import Feature from './Feature'
import GameObject from './GameObject'

class Layer extends Feature {

    /** @private */
    CAMERA_NAME = generateId(16)

    /**
     * @protected
     * @type {GameObject}
     */
    container = null

    /**
     * @private
     * @type {Time.TimerEvent}
     */
    layerLoop = null

    /** @protected */
    onCreate() {
        if (this.scene.cameras.main.name === '') {
            this.scene.cameras.main.setName(this.CAMERA_NAME)
        } else {
            const { width, height } = this.game.config
            this.scene.cameras.add(0, 0, width, height, false, this.CAMERA_NAME)
        }

        this.camera.centerOn(0, 0)

        this.container = new GameObject(this.scene, 0, 0)
        this.scene.add.existing(this.container)

        this.layerLoop = this.scene.time.addEvent({
            delay: 100,
            callback: this.onLayerUpdate,
            callbackScope: this,
            loop: true
        })
        this.onLayerUpdate()
    }

    set visible(value = true) {
        this.container.setVisible(value)
        return this.visible
    }

    get visible() {
        return this.container.visible
    }

    /**
     * @protected
     */
    onLayerUpdate() {
        this.container.cameraFilter = this.cameraFilter
    }

    /** @protected */
    onDestroy() {
        this.container.destroy()
        this.container = null
        this.layerLoop.remove()
        this.layerLoop.destroy()
        if (this.camera === null) {
            return
        }
        if (this.camera.id === this.scene.cameras.main.id) {
            this.camera.setName('')
        } else {
            this.scene.cameras.remove(this.camera)
        }
    }

    get camera() {
        return this.scene.cameras.getCamera(this.CAMERA_NAME)
    }

    get cameraFilter() {
        let cameraId = this.camera.id
        let filter = 0
        for (let camera of this.scene.cameras.cameras) {
            if (camera.id === cameraId) continue
            filter |= camera.id
        }
        return filter
    }

    get list() {
        return this.container.list
    }

    /**
     * @template {GameObjects.GameObject} T
     * @param {string} name 
     * @returns {T}
     */
    getByName(name) {
        return this.container.getByName(name)
    }
}

export default Layer