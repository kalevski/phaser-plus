import { Scene2D } from '@phaser-plus/perspective2d'
import { Debugger } from '@phaser-plus/debugger'
import { Structs } from '@phaser-plus/core'

class HelloWorld extends Scene2D {

    onInit() {
        this.world.projection = new Structs.Matrix2.createISO(64)
        this.world.debug()
    }

    onLoad() {
        
    }

    onCreate() {

    }

    onDestroy() {
        
    }

}

export default HelloWorld