import { AUTO, Core, Game, Scale } from 'phaser'
import { getSceneClass } from './main'
import { logging } from '@toolcase/logging'

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

const logger = logging.getLogger('@phaser-plus/examples')

let url = new window.URL(window.location.href)
let sceneName = url.searchParams.get('scene') || 'HelloWorld'
let Scene = getSceneClass(sceneName)


const game = new Game(config)
game.scene.add('default', new Scene())
game.scene.start('default')


logger.info(`${sceneName}`)