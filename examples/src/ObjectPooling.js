import { Scene } from '@phaser-plus/core'
import World from './layers/World'
import Turtle from './prefabs/Turtle'


class ObjectPooling extends Scene {

    /** @type {World} */
    world = null

    instances = 1

    visibleTurtlesText = 'Number of visible turtle objects: '

    actualTurtlesText = 'Number of actual turtle objects: '

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config
        this.matter.world.setBounds(-width / 2, -height / 2)

        this.pool.register('turtle', Turtle)

        this.visibleInstancesText = this.add.text(250, 0, `${this.visibleTurtlesText} ${this.instances}`, { font: '16px Courier', fill: '#00ff00' })
        this.actualInstancesText = this.add.text(250, 50, `${this.actualTurtlesText} 1`, { font: '16px Courier', fill: '#00ff00' })

        // check layer implementation [https://github.com/kalevski/phaser-plus/tree/main/examples/src/layers/World.js]
        this.world = this.features.register('world', World)

        this.world.add('turtle', 0, -200)
        
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', this.mouseClick, this)
        
    }

    mouseClick(event, objects) {
        //TODO: show also the actual object created in phaser, so we can compare between actual object and ones that are visible
        let [ turtle = null ] = objects

        this.actualInstancesText.setText(`${this.actualTurtlesText} ${this.world.scene.instances}`)
        if(event.leftButtonDown()) {
            this.world.add('turtle', event.worldX, event.worldY)
            this.visibleInstancesText.setText(`${this.visibleTurtlesText} ${++this.instances}`)
            
        } else if(event.rightButtonDown() && turtle !== null){
            this.world.remove(turtle.parentContainer)
            this.instances--
            this.visibleInstancesText.setText(`${this.visibleTurtlesText} ${this.instances}`)
        }
    }
}

export default ObjectPooling