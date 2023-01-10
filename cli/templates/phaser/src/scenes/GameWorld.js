import { Scene } from 'phaser'


class GameWorld extends Scene {

    create() {
        this.cameras.main.setBackgroundColor('#34c3eb')
        this.add.text(680, 360, 'Hello').setAlign('center').setOrigin(.5).setFontSize(64)
    }

}

export default GameWorld