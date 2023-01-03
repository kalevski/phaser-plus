import Panel from './Panel'
import LayerHandler from './proxyHandlers/LayerHandler'

class LayerPanel extends Panel {

    /**  @private */
    layerHandler = new LayerHandler()

    state = {
        objectOptions: []
    }

    components = {
        visible: null,
        cameraXY: null,
        zoom: null,
        searchInput: null,
        searchType: null,
        findButton: null
    }

    draw() {
        this.components.childrens = this.base.addInput(this.layerHandler, 'childs', {
            label: 'Objects',
            disabled: true,
            step: 1
        })
        this.components.visible = this.base.addInput(this.layerHandler, 'visible')
        this.components.cameraXY = this.base.addInput(this.layerHandler, 'camera', {
            label: 'Camera',
            x: {},
            y: {},
            expanded: false
        })
        this.components.zoom = this.base.addInput(this.layerHandler.camera, 'zoom', {
            label: 'Zoom',
            min: 0.1,
            max: 3,
        })
        this.base.addSeparator()
        
        this.components.searchType = this.base.addBlade({
            view: 'list',
            label: 'Search',
            options: [
                { text: 'Object by name', value:'object_name' }
                // { text: 'Object by ID', value:'id' }
            ],
            value: 'object_name'
        })
        this.components.searchInput = this.base.addBlade({
            view: 'text',
            label: 'Input',
            parse: value => value,
            value: ''
        })
        this.components.findButton = this.base.addButton({ title: 'Find' })
        this.components.findButton.on('click', this.onFind)

    }

    /** @private */
    dispose() {

    }

    setLayer(key) {
        let layer = this.scene.features.get(key)
        if (key === null || layer === null) {
            this.base.hidden = true
            this.layerHandler.removeRef()
            return
        }
        this.base.hidden = false
        this.base.title = `Layer [${key}]`
        this.layerHandler.setRef(layer)

        this.refreshComponents()
        this.components.searchInput.value = ''
    }

    /** @private */
    doUpdate() {
        if (this.base.hidden) {
            return
        }
        this.state.objectOptions.push({ text: Math.random().toString(), value: '' })
        this.refreshComponents()
    }

    /** @private */
    refreshComponents() {
        for (let key in this.components) {
            if (typeof this.components[key].refresh === 'function') {
                this.components[key].refresh()
            }
        }
    }

    onFind = () => {
        let inputValue = this.components.searchInput.value
        if (inputValue === '') {
            return
        }
        let searchType = this.components.searchType.value
        this.emit('layer_search', this.layerHandler.getRef().key, searchType, inputValue)
    }

}

export default LayerPanel