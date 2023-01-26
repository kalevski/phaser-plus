import { GameObjects, Time } from 'phaser'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { HTMLFeature } from '@phaser-plus/core'
import GameObjectPanel from './GameObjectPanel'
import InspectorPanel from './InspectorPanel'
import OverviewPanel from './OverviewPanel'
import LayerPanel from './LayerPanel'
import FlowPanel from './FlowPanel'
import Panel from './Panel'

class Debugger extends HTMLFeature {

    /**
     * @private
     * @type {Pane}
     */
    pane = null

    /** @private */
    panels = {
        /** @type {InspectorPanel} */
        inspector: null,
        /** @type {OverviewPanel} */
        overview: null,
        /** @type {FlowPanel} */
        flow: null,
        /** @type {LayerPanel} */
        layer: null,
        /** @type {GameObjectPanel} */
        gameObject: null
    }

    /**
     * @private
     * @type {Time.TimerEvent}
     */
    updateLoop = null


    /**
     * @override
     * @protected
     */
    onCreate() {
        this.pane = new Pane({
            title: 'Debugger',
            expanded: false
        })
        this.pane.registerPlugin(EssentialsPlugin)
        this.panels.inspector = new InspectorPanel(this.scene, this.pane)
        this.panels.inspector.draw()
        
        let eventsFolder = this.pane.addFolder({ title: 'Flow Events' })
        this.panels.flow = new FlowPanel(this.scene, eventsFolder)
        this.panels.flow.draw()

        let overviewFolder = this.pane.addFolder({ title: 'Scene Objects' })
        this.panels.overview = new OverviewPanel(this.scene, overviewFolder)
        this.panels.overview.draw()
        this.panels.overview.on('layer', this.onLayerChange, this)

        let layerFolder = this.pane.addFolder({
            title: 'Layer',
            expanded: true,
            hidden: true
        })
        this.panels.layer = new LayerPanel(this.scene, layerFolder)
        this.panels.layer.draw()
        this.panels.layer.on('layer_search', this.onLayerSearch, this)

        let gameObjectFolder = this.pane.addFolder({
            title: 'Game Object',
            expanded: true,
            hidden: true
        })
        this.panels.gameObject = new GameObjectPanel(this.scene, gameObjectFolder)
        this.panels.gameObject.draw()

        this.updateLoop = this.scene.time.addEvent({
            delay: 200,
            callback: this.onTick,
            callbackScope: this,
            loop: true
        })
        this.onTick()
    }

    /**
     * @override
     * @protected
     * @param {number} time 
     * @param {number} delta 
     */
    onUpdate(time, delta) {
        this.panels.inspector.measureFPS()
    }

    /** @private */
    onTick() {
        for (let key in this.panels) {
            let panel = this.panels[key]
            panel.doUpdate()
        }
    }

    /**
     * @override
     * @protected
     */
    onDestroy() {
        for (let key in this.panels) {
            let panel = this.panels[key]
            panel.dispose()
        }
        this.pane.dispose()
        this.updateLoop.remove()
        this.updateLoop.destroy()
    }

    /** @private */
    onLayerChange(key) {
        this.panels.layer.setLayer(key)
    }

    /** @private */
    onLayerSearch(layer, searchType, inputValue) {
        if (searchType === 'object_name') {
            this.panels.gameObject.findObjectByName(layer, inputValue)
        }
    }

    /**
     * 
     * @param {GameObjects.GameObject} gameObject 
     */
    inspect(gameObject) {
        this.panels.gameObject.inspect(gameObject)
        return this
    }

    /**
     * @template {Panel} T
     * @param {string} key
     * @param {new T} panelClass 
     * @returns {T}
     */
    addPanel(key, panelClass, title = null) {
        let folder = this.pane.addFolder({
            title: title === null ? key : title
        })
        if (typeof key !== 'string' || typeof this.panels[key] !== 'undefined') {
            throw new Error(`panel key=${key} is laready taken`)
        }
        let panel = new panelClass(this.scene, folder)
        this.panels[key] = panel
        return panel
    }

    /**
     * @template {Panel} T
     * @param {string} key 
     * @returns {T}
     */
    getPanel(key) {
        return this.panels[key] || null
    }

    setExpanded(flag = true) {
        if (typeof flag !== 'boolean') {
            return this
        }
        this.pane.expanded = flag
        return this
    }

}

Debugger.Panel = Panel
Debugger.GameObjectPanel = GameObjectPanel

export default Debugger