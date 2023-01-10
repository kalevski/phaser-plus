import { Layer } from '@phaser-plus/core'

class DebugUILayer extends Layer {

    onCreate() {
        super.onCreate()

        let text = this.scene.add.text(550, -300, 'Debugger --> ')
            .setOrigin(1, .5)
            .setFontSize(36)

        const guideText = `
1. Select "world" layer
2. Type "my_turtle" in Input field
3. Press on Find button
4. Press on Focus button
        `

        let guide = this.scene.add.text(-200, -200, guideText).setOrigin(.5).setFontSize(24)
        this.container.add(guide)
        this.container.add(text)
    }

}

export default DebugUILayer