import { Scene } from '@phaser-plus/core'
import World from './layers/World'
import Turtle from './prefabs/Turtle'


class ObjectPooling extends Scene {

    /** @type {World} */
    world = null

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        this.matter.world.setBounds(-width / 2, -height / 2)

        this.pool.register('turtle', Turtle)

        // check layer implementation [https://github.com/kalevski/phaser-plus/tree/main/examples/src/layers/World.js]
        this.world = this.features.register('world', World)

        this.world.add('turtle', 0, -200)
        
        this.input.on('pointerup', this.mouseClick, this)
        
    }

    mouseClick(event, objects) {
        // TODO: Change leftButtonDown to rightButtonDown if getDuration is not working
        //       Fix remove object, since right click is not working and it shows right click menu
        // if(event.rightButtonDown()) {
        if(event.leftButtonDown() && event.getDuration() > 500) {
            let [ turtle = null ] = objects
            if(turtle !== null) {
                debugger
                this.world.remove(turtle)
            }
        } else {
            this.world.add('turtle', event.worldX, event.worldY)
        }
    }
}

export default ObjectPooling