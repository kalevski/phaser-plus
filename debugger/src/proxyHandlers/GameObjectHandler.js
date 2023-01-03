import { GameObject } from '@phaser-plus/core'
import ProxyHandler from './ProxyHandler'

class GameObjectPosition extends ProxyHandler {
    get x() {
        if (this.ref === null) {
            return 0
        } else {
            return this.ref.x
        }
    }

    set x(value) {
        if (this.ref === null) {
            return 0
        } else {
            this.ref.setX(value)
        }
    }

    get y() {
        if (this.ref === null) {
            return 0
        } else {
            return this.ref.y
        }
    }

    set y(value) {
        if (this.ref === null) {
            return 0
        } else {
            this.ref.setY(value)
        }
    }
}

class GameObjectScale extends ProxyHandler {
    get x() {
        if (this.ref === null) {
            return 0
        } else {
            return this.ref.scaleX
        }
    }

    set x(value) {
        if (this.ref === null) {
            return 0
        } else {
            this.ref.setScale(value, this.ref.scaleX)
        }
    }

    get y() {
        if (this.ref === null) {
            return 0
        } else {
            return this.ref.scaleY
        }
    }

    set y(value) {
        if (this.ref === null) {
            return 0
        } else {
            this.ref.setScale(this.ref.scaleX, value)
        }
    }
}

class GameObjectTransform extends ProxyHandler {
    get x() {
        if (this.ref === null || typeof this.ref.transform === 'undefined') {
            return 0
        } else {
            return this.ref.transform.x
        }
    }

    set x(value) {
        if (this.ref === null || typeof this.ref.transform === 'undefined') {
            return 0
        } else {
            this.ref.setTransformX(value)
        }
    }

    get y() {
        if (this.ref === null || typeof this.ref.transform === 'undefined') {
            return 0
        } else {
            return this.ref.transform.y
        }
    }

    set y(value) {
        if (this.ref === null || typeof this.ref.transform === 'undefined') {
            return 0
        } else {
            this.ref.setTransformY(value)
        }
    }
}

/**
 * @extends {ProxyHandler<GameObject>}
 */
class GameObjectHandler extends ProxyHandler {

    position = new GameObjectPosition()

    transform = new GameObjectTransform()

    scale = new GameObjectScale()

    proxyList = [
        this.position,
        this.transform,
        this.scale
    ]

    get id() {
        if (this.ref === null) {
            return 'N/A'
        } else {
            return this.ref.id || 'N/A'
        }
    }

    get name() {
        if (this.ref === null) {
            return 'N/A'
        } else {
            return this.ref.name || 'N/A'
        }
    }

    get type() {
        if (this.ref === null) {
            return 'N/A'
        }
        return this.ref.type
    }

    get visible() {
        if (this.ref === null) {
            return false
        }
        return this.ref.visible
    }

    set visible(value) {
        if (this.ref === null) {
            return false
        }
        this.ref.setVisible(value)
    }

    get alpha() {
        if (this.ref === null) {
            return 1
        }
        return this.ref.alpha
    }

    set alpha(value) {
        if (this.ref === null) {
            return 1
        }
        this.ref.setAlpha(value)
    }

    get angle() {
        if (this.ref === null) {
            return 0
        }
        return this.ref.angle
    }

    set angle(value) {
        if (this.ref === null) {
            return 0
        }
        this.ref.setAngle(value)
    }



}

export default GameObjectHandler