import {  Layer, Scene } from '@phaser-plus/core'
import { Debugger } from '@phaser-plus/debugger'
import DebugUILayer from './layers/DebugUILayer'
import Turtle from './prefabs/Turtle'

class World extends Layer {

    onCreate() {
        super.onCreate()
        let turtle = this.scene.pool.obtain('turtle')
            .setName('my_turtle')
        this.container.add(turtle)
    }

}

class Debugging extends Scene {

    onInit() {
        this.features.register('debugger', Debugger)
    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        this.pool.register('turtle', Turtle)
        this.features.register('world', World)
        this.features.register('ui', DebugUILayer)
    }
}

export default Debugging