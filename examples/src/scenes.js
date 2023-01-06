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
        description: 'Hello world example',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211034362-5e6715bb-ca65-4570-9eab-35685b5cc606.png',
        imageAlt: 'Phaser+ example - hello world',
        sceneClass: HelloWorld
    }
]

export default scenes