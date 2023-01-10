import { Scene } from '@phaser-plus/core'

class HelloWorld extends Scene {

    onInit() {
        
    }

    onLoad() {
        this.load.atlas('objects', [ 'assets/objects.png', ], 'assets/objects.json')
    }

    onCreate() {
        const { width, height } = this.game.config

        this.add.image(width / 2, height / 2, 'objects', 'circle_green')

        this.add.text(width / 2, height / 2 + 200, 'Welcome to Phaser+ Examples')
            .setOrigin(.5)
            .setFontSize(36)
    }

    onDestroy() {
        // invoked if you change scene using this.goTo('--key of your next scene--')
    }

}

export default HelloWorld