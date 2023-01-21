import { Scene } from '@phaser-plus/core'
import World from './layers/World'
import Turtle from './prefabs/Turtle'


class ObjectPooling extends Scene {

    /** @type {World} */
    world = null

    instances = 1

    scoreText = 'number of turtle objects: '

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        this.matter.world.setBounds(-width / 2, -height / 2)

        this.pool.register('turtle', Turtle)

        this.text = this.add.text(350, 0, `${this.scoreText} ${this.instances}`, { font: '16px Courier', fill: '#00ff00' });

        // check layer implementation [https://github.com/kalevski/phaser-plus/tree/main/examples/src/layers/World.js]
        this.world = this.features.register('world', World)

        this.world.add('turtle', 0, -200)
        
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', this.mouseClick, this)
        
    }

    mouseClick(event, objects) {
        //TODO: show also the actual object created in phaser, so we can compare between actual object and ones that are visible
        let [ turtle = null ] = objects
        if(event.leftButtonDown()) {
            this.world.add('turtle', event.worldX, event.worldY)
            this.text.setText(`${this.scoreText} ${++this.instances}`)
            
        } else if(event.rightButtonDown() && turtle !== null){
            this.world.remove(turtle)
            this.instances--
            this.text.setText(`${this.scoreText} ${++this.instances}`)
        }
    }
}

export default ObjectPooling