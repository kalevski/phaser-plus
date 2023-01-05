import { AUTO, Core, Game, Scale } from 'phaser'
import { getScene } from './main'

/** @type {Core.Config} */
const config = {
    type: AUTO,
    parent: 'root',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    dom: {
        createContainer: true
    },
    antialias: true,
    width: 1280,
    height: 720
}


let url = new window.URL(window.location.href)
let sceneName = url.searchParams.get('scene') || 'hello-world'
let entry = getScene(sceneName)
if (entry !== null) {
    const game = new Game(config)
    game.scene.add('default', new entry.sceneClass())
    game.scene.start('default')
    setTimeout(() => {
        game.destroy(true, false)
    }, 2000)
}




