import {  Layer, Scene } from '@phaser-plus/core'
import Turtle from './prefabs/Turtle'

class UI extends Layer {
    onCreate() {
        super.onCreate()

        /** ignore physics debug lines on UI camera */
        this.camera.ignore(this.scene.matter.world.debugGraphic)

        let text = this.scene.add.text(0, 0, 'UI TEXT')
            .setOrigin(.5)
            .setFontSize(36)
        this.container.add(text)
    }
}

class World extends Layer {
    onCreate() {
        super.onCreate()

        let turtle = this.scene.pool.obtain('turtle')
        this.container.add(turtle)

        this.camera.startFollow(turtle).setFollowOffset(0, 100)
    }
}

class SceneLayers extends Scene {

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config

        this.matter.world.setBounds(-width / 2, -height / 2)

        
        this.pool.register('turtle', Turtle)
        
        this.features.register('world', World)
        this.features.register('ui', UI)
    }
}

export default SceneLayers