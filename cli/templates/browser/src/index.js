import { Game } from 'phaser'
import config from './config'

import GameWorld from './scenes/GameWorld'

const game = new Game(config)

game.scene.add('world', new GameWorld())
game.scene.start('world')