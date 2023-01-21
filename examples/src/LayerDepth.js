import { Scene2D } from '@phaser-plus/perspective2d'
import { Debugger } from '@phaser-plus/debugger'
import Barrel2D from './prefabs/Barrel2D'
import Box from './prefabs/Box'
import { Flow } from '@phaser-plus/core'

class ChangeLayerOrder extends Flow.Event {

    onFire() {

        let world = this.scene.features.get('world')
        let ui = this.scene.features.get('ui')

        let temp = world.depth
        world.depth = ui.depth
        ui.depth = temp
    }

}

class LayerDepth extends Scene2D {

    onInit() {
        this.features.register('debugger', Debugger)
    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        this.pool.register('box', Box)
        this.world.register('barrel', Barrel2D)
        
        this.ui.add('box', 0, 0).changeColor()
        this.world.add('barrel', 0.1, 0.1)
        
        this.world.depth = 2
        this.ui.depth = 0

        this.flow.events.add('change_layer_order', ChangeLayerOrder)
        this.flow.events.trigger('change_layer_order', null, 2)
    }

}

export default LayerDepth