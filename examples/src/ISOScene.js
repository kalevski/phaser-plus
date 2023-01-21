import { Structs } from '@phaser-plus/core'
import { Debugger } from '@phaser-plus/debugger'
import { GameObject2D, Scene2D } from '@phaser-plus/perspective2d'
import { GameObjects } from 'phaser'

class Barrel extends GameObject2D {
    
    /** @type {GameObjects.Sprite} */
    stand = null

    /** @type {GameObjects.Sprite} */
    barrel = null
    
    onCreate() {
        this.stand = this.scene.add.sprite(0, 0, 'objects', 'barrel_stand')
        this.barrel = this.scene.add.sprite(0, -40, 'objects', 'barrel_horizontal')

        this.add(this.stand).add(this.barrel)
    }
}

class ISOScene extends Scene2D {

    onInit() {
        this.features.register('debugger', Debugger)

        this.world.projection = Structs.Matrix2.createISO(64)
        this.world.debug()
    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        this.world.register('barrel', Barrel)

        this.world.add('barrel', -1, -1).setName('barrel1')
        this.world.add('barrel', -1, 1).setName('barrel2')
        this.world.add('barrel', 1, -1).setName('barrel3')
        this.world.add('barrel', 1, 1).setName('barrel4')

        this.world.sort.set()

        // function executed after 5 seconds
        this.flow.events.triggerFn(() => {
            this.world.projection = Structs.Matrix2.create(100, 100)
        }, 5)
    }

    onDestroy() {
        
    }
}

export default ISOScene