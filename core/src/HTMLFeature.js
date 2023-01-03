import Feature from './Feature'
import Scene from './Scene'

class HTMLFeature extends Feature {

    /**
     * @private
     * @type {HTMLDivElement}
     */
    _node = null

    /**
     * 
     * @param {Scene} scene 
     * @param {string} key 
     */
    constructor(scene, key) {
        super(scene, key)
        let container = this.game.domContainer
        if (container === null) {
            throw new Error('dom container is not enabled, enable by setting dom.createContainer inside config')
        }
        HTMLFeature.setup()
        this._node = window.document.createElement('div')
        this._node.setAttribute('id', `feature-${key}`)
        this._node.classList.add('html-feature')
        this._node.classList.add(`feature-${key}`)
        container.append(this._node)
    }

    get node() {
        return this._node
    }

    /** @private */
    preDestroy() {
        super.preDestroy()
        this._node.remove()
        this._node = null
    }

}

HTMLFeature.setup = () => {
    let style = document.getElementById('@toolcase/phaser-plus/dom')
    if (style !== null) {
        return null
    }
    style = document.createElement('style')
    style.id = '@toolcase/phaser-plus/dom'
    style.innerHTML = `
    .html-feature {
        pointer-events: none;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .html-feature * {
        pointer-events: auto;
        user-select: none;
    }`
    document.head.append(style)
}

export default HTMLFeature