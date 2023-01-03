import { Layer } from '@phaser-plus/core'
import Panel from './Panel'

class OverviewPanel extends Panel {

    state = {
        poolInstances: 0,
        features: 0,
        gameObjects: 0,
        layerList: [],
        layerSelected: null,
        layer: {
            objects: 0,

        }
    }

    components = {
        poolInstances: null,
        features: null,
        gameObjects: null,
        layerList: null,
        layerSeparator: null
    }

    draw() {
        this.components.features = this.base.addInput(this.state, 'features', {
            label: 'Features',
            step: 1,
            disabled: true
        })

        this.components.poolInstances = this.base.addInput(this.state, 'poolInstances', {
            label: 'Pool',
            step: 1,
            disabled: true
        })

        this.components.gameObjects = this.base.addMonitor(this.state, 'gameObjects', {
            view: 'graph',
            label: 'Objects',
            max: 100,
            min: 0
        })
        this.components.layerList = this.base.addBlade({
            view: 'list',
            label: 'Layer',
            options: this.state.layerList,
            value: '',
        })
        this.components.layerList.on('change', this.onLayerListSelect)
    }

    doUpdate() {
        this.state.poolInstances = this.scene.pool.instances
        this.components.poolInstances.refresh()

        let featureKeys = this.scene.features.keys

        this.state.features = featureKeys.length
        this.state.gameObjects = 0
        let layerList = []
        for (let key of featureKeys) {
            let feature = this.scene.features.get(key)
            if (feature instanceof Layer) {
                layerList.push(feature.key)
                this.state.gameObjects += feature.list.length
            }
        }
        this.components.features.refresh()
        this.components.gameObjects.refresh()
        this.updateLayerList(layerList)
    }

    /**
     * @private
     * @param {Array<string>} list 
     */
    updateLayerList(list = []) {
        let hash = JSON.stringify(list)
        if (this.components.layerList.hash === hash) {
            return
        }
        this.components.layerList.hash = hash
        list.unshift('')
        this.state.layerList = list.map(key => {
            return { text: key, value: key }
        })
        this.components.layerList.options = this.state.layerList
        this.state.layerSelected = null
        this.onLayerDisplay()
    }

    /** @private */
    onLayerListSelect = (event) => {
        if (event.value === '') {
            this.state.layerSelected = null
        } else {
            this.state.layerSelected = event.value
        }
        this.onLayerDisplay()
    }

    onLayerDisplay() {
        this.emit('layer', this.state.layerSelected)
    }

}

export default OverviewPanel