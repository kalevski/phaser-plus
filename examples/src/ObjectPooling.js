import { Structs, Scene, GameObject, Layer } from '@phaser-plus/core'
import { GameObjects } from 'phaser'

class MyGameObject extends GameObject {
    
    /** @type {GameObjects.Sprite} */
    baseSprite = null
    
    onCreate() {
        this.baseSprite = this.scene.add.sprite(0, 0, 'objects', 'flask')
            .setVisible(false)
        
        this.add(this.baseSprite)
        this.setInteractive(true)
    }

    onAdd(parent) {
        this.baseSprite.setVisible(true)
    }

    onUpdate(time, delta) {

    }

    onRemove(parent) {
        this.baseSprite.setVisible(false)
    }

    onDestroy() {}
}

class DefaultLayer extends Layer {

    add(gameObject) {
        this.container.add(gameObject)
        return this
    }

    remove(gameObject) {
        this.container.remove(gameObject)
        return this
    }

}

class ObjectPooling extends Scene {

    /** @type {DefaultLayer} */
    defaultLayer = null

    onInit() {

    }

    onLoad() {
        this.load.atlas('objects', [
            'assets/objects.png',
            'assets/objects_n.png'
        ], 'assets/objects.json')
    }

    onCreate() {

        this.features.register('default-layer', DefaultLayer)

        this.pool.register('my-game-object', MyGameObject)

        let myObject = this.pool.obtain('my-game-object')

        this.input.on('pointerdown', this.onMouseClick, this)
        
        // this.defaultLayer.add(myObject)
        // this.defaultLayer.delete(myObject)

        // this.pool.release
        // this.pool.instances
    }

    onDestroy() {
        
    }

    onMouseClick(event, objects) {
        console.log(event)
        console.log(object)
        if(event.rightButtonDown()) {
            let [ object = null ] = objects
            if(object !== null) {
                this.defaultLayer.remove(object)
            }            
        } else {
            let myObject = this.pool.obtain('my-game-object')
            this.defaultLayer.add(myObject)
        }
    }

}

export default ObjectPooling