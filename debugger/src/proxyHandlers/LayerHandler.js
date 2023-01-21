import { Layer } from '@phaser-plus/core'
import ProxyHandler from './ProxyHandler'

/**
 * @augments ProxyHandler<Layer>
 */
class CameraPositionHandler extends ProxyHandler {

    set zoom(value) {
        if (this.ref === null) {
            return 1
        } else {
            this.ref.camera.setZoom(value)
        }
    }

    get zoom() {
        if (this.ref === null) {
            return 1
        } else {
            return this.ref.camera.zoom
        }
    }

    set x(value) {
        if (this.ref === null) {
            return 0
        } else {
            this.ref.camera.centerOnX(value)
        }
    }

    get x() {
        if (this.ref === null) {
            return 0
        } else {
            return this.ref.camera.scrollX + this.ref.camera.centerX
        }
    }

    set y(value) {
        if (this.ref === null) {
            return 0
        } else {
            this.ref.camera.centerOnY(value)
        }
    }

    get y() {
        if (this.ref === null) {
            return 0
        } else {
            return this.ref.camera.scrollY + this.ref.camera.centerY
        }
    }

}

/**
 * @augments ProxyHandler<Layer>
 */
class LayerHandler extends ProxyHandler {

    camera = new CameraPositionHandler()

    /** @private */
    proxyList = [
        this.camera
    ]

    set visible(value) {
        if (this.ref === null) {
            return false
        } else {
            this.ref.visible = value
        }
    }

    get visible() {
        if (this.ref === null) {
            return false
        } else {
            return this.ref.visible
        }
    }

    get childs() {
        if (this.ref === null) {
            return 0
        }
        return this.ref.list.length
    }

    set childs(value) {}

}

export default LayerHandler
