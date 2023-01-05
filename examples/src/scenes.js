import { Scene } from '@phaser-plus/core'
import HelloWorld from './HelloWorld'

/**
 * @typedef SceneEntry
 * @property {string} slug
 * @property {string} title
 * @property {string} sceneFile
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} imageAlt
 * @property {new Scene} sceneClass
 */

/**
 * @type {Array<SceneEntry>}
 */
const scenes = [
    {
        slug: 'hello-world',
        title: 'Hello World',
        sceneFile: 'HelloWorld.js',
        description: '',
        imageUrl: '',
        imageAlt: '',
        sceneClass: HelloWorld
    }
]

export default scenes