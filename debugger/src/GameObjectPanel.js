import { GameObjects } from 'phaser'
import { Layer } from '@phaser-plus/core'
import Panel from './Panel'
import GameObjectHandler from './proxyHandlers/GameObjectHandler'

class GameObjectPanel extends Panel {

    /**
     * @private
     * @type {string}
     */
    objectLayer = null

    /** @private */
    gameObjectHandler = new GameObjectHandler()

    components = {
        id: null,
        name: null,
        visible: null,
        alpha: null,
        name: null,
        coordsXY: null,
        transformXY: null,
        scaleXY: null,
        angle: null,
        focusBtn: null
    }

    draw() {
        this.components.id = this.base.addBlade({
            view: 'text',
            disabled: true,
            label: 'ID',
            parse: v => v,
            value: 'N/A',
        })
        this.components.name = this.base.addBlade({
            view: 'text',
            disabled: true,
            label: 'Name',
            parse: v => v,
            value: 'N/A',
        })
        this.components.type = this.base.addBlade({
            view: 'text',
            disabled: true,
            label: 'Type',
            parse: v => v,
            value: 'N/A',
        })
        this.components.visible = this.base.addInput(this.gameObjectHandler, 'visible')
        this.components.alpha = this.base.addInput(this.gameObjectHandler, 'alpha', {
            label: 'Alpha',
            min: 0,
            max: 1,
        })
        this.components.coordsXY = this.base.addInput(this.gameObjectHandler, 'position', {
            label: 'Position',
            x: {},
            y: {}
        })
        this.components.transformXY = this.base.addInput(this.gameObjectHandler, 'transform', {
            label: 'Transform',
            x: {},
            y: {}
        })
        this.components.scaleXY = this.base.addInput(this.gameObjectHandler, 'scale', {
            label: 'Scale',
            x: { min: 0.1, max: 10 },
            y: { min: 0.1, max: 10 }
        })
        this.components.angle = this.base.addInput(this.gameObjectHandler, 'angle', {
            label: 'Angle',
            min: 0,
            max: 360,
        })
        this.base.addSeparator()
        this.components.focusBtn = this.base.addButton({
            title: 'Focus'
        }).on('click', this.onFocus)
    }

    findObjectByName(layerKey, objectName) {
        /** @type {Layer} */
        let layer = this.scene.features.get(layerKey)
        if (layer === null) {
            return this.showPanel(false)    
        }
        let gameOBject = layer.getByName(objectName)
        
        if (gameOBject === null) {
            return this.showPanel(false)
        }

        this.showPanel(true)
        this.base.title = `Game Object [${objectName}]`
        this.gameObjectHandler.setRef(gameOBject)
        this.objectLayer = layerKey
        this.refreshComponents()
    }

    /** @private */
    doUpdate() {
        if (this.base.hidden) {
            return
        }
        this.refreshComponents()
    }

    /** @private */
    showPanel(flag = true) {
        this.base.hidden = !flag
    }

    /** @private */
    refreshComponents() {
        for (let key in this.components) {
            if (typeof this.components[key].refresh === 'function') {
                this.components[key].refresh()
            }
        }
        this.components.id.value = this.gameObjectHandler.id
        this.components.name.value = this.gameObjectHandler.name
        this.components.type.value = this.gameObjectHandler.type
        if (typeof this.gameObjectHandler.getRef().transform === 'undefined') {
            this.components.transformXY.disabled = true
        } else {
            this.components.transformXY.disabled = false
        }
    }

    onFocus = () => {
        /** @type {Layer} */
        let layer = this.scene.features.get(this.objectLayer)
        if (layer === null) {
            return
        }
        layer.camera.centerOn(this.gameObjectHandler.position.x, this.gameObjectHandler.position.y)
    }

    inspect(gameObject) {
        if (gameObject instanceof GameObjects.GameObject) {
            this.gameObjectHandler.setRef(gameObject)
            this.base.title = `Game Object [${gameObject.type}]`
            this.showPanel(true)
        }
    }

}

export default GameObjectPanel