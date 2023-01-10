import { Scene } from '@phaser-plus/core'
import CollisionEvents from './CollisionEvents'
import CreateGameObjects from './CreateGameObjects'
import CreatePhysicsObjects from './CreatePhysicsObjects'
import Debugging from './Debugging'
import GameEvents from './GameEvents'
import HelloWorld from './HelloWorld'
import ISOScene from './ISOScene'
import SceneLayers from './SceneLayers'
import TimeEvents from './TimeEvents'


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
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658474-71e48fc3-df32-475f-a988-a3ea641aa861.jpg',
        imageAlt: 'Phaser Plus example - hello world',
        sceneClass: HelloWorld
    },
    {
        slug: 'create-game-objects',
        title: 'Create Game Objects',
        sceneFile: 'CreateGameObjects.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658594-64dee46b-1bed-4cee-ae4e-d0b3cad298f0.jpg',
        imageAlt: 'Phaser Plus example - Create Game Objects',
        sceneClass: CreateGameObjects
    },
    {
        slug: 'create-physics-objects',
        title: 'Create Physics Objects',
        sceneFile: 'CreatePhysicsObjects.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658668-ed821d61-315e-48e4-8d7f-7f5d5340e0f7.jpg',
        imageAlt: 'Phaser Plus example - Create Physics Objects',
        sceneClass: CreatePhysicsObjects
    },
    {
        slug: 'scene-layers',
        title: 'Scene Layers',
        sceneFile: 'SceneLayers.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658778-0d4e69a2-2d32-4103-b7d8-a709be637d8b.jpg',
        imageAlt: 'Phaser Plus example - Scene Layers',
        sceneClass: SceneLayers
    },
    {
        slug: 'debugging',
        title: 'Debugging',
        sceneFile: 'Debugging.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658860-d131313c-27cf-4d61-8db1-f3bb4f9148de.jpg',
        imageAlt: 'Phaser Plus example - Debugging',
        sceneClass: Debugging
    },
    {
        slug: 'game-events',
        title: 'Game Events',
        sceneFile: 'GameEvents.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658668-ed821d61-315e-48e4-8d7f-7f5d5340e0f7.jpg',
        imageAlt: 'Phaser Plus example - Game Events',
        sceneClass: GameEvents
    },
    {
        slug: 'time-events',
        title: 'Time Events',
        sceneFile: 'TimeEvents.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211658668-ed821d61-315e-48e4-8d7f-7f5d5340e0f7.jpg',
        imageAlt: 'Phaser Plus example - Time Events',
        sceneClass: TimeEvents
    },
    {
        slug: 'collision-events',
        title: 'Collision Events',
        sceneFile: 'CollisionEvents.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211659038-3a32cbbc-3bdf-4aeb-a5d0-7ed62ebd8a5e.jpg',
        imageAlt: 'Phaser Plus example - Collision Events',
        sceneClass: CollisionEvents
    },
    {
        slug: 'iso-scene',
        title: 'Isometric Scene',
        sceneFile: 'ISOScene.js',
        description: '',
        imageUrl: 'https://user-images.githubusercontent.com/10467454/211659097-2424c5eb-423c-4779-8e46-0d262eefeac3.jpg',
        imageAlt: 'Phaser Plus example - Isometric Scene',
        sceneClass: ISOScene
    }
]

export default scenes