import { Scene2D } from '@phaser-plus/perspective2d'
import { Debugger } from '@phaser-plus/debugger'
import { Flow } from '@phaser-plus/core'

class SimpleEvent extends Flow.Event {

    onFire() {
        console.log('here ?')
    }

}

class HelloWorld extends Scene2D {

    onInit() {
        this.world.debug()
    }

    onLoad() {
        
    }

    onCreate() {
        this.features.register('debugger', Debugger)
        this.flow.events.add('simple', SimpleEvent)
    }

    onDestroy() {
        
    }

}

export default HelloWorld