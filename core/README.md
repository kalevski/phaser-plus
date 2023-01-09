# @phaser-plus/core
[![GitHub](https://img.shields.io/github/license/kalevski/phaser-plus?style=for-the-badge)](https://github.com/kalevski/phaser-plus/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@phaser-plus/core?color=teal&label=VERSION&style=for-the-badge)](https://www.npmjs.com/package/@phaser-plus/core)
[![npm downloads](https://img.shields.io/npm/dw/@phaser-plus/core?label=downloads&style=for-the-badge)](https://www.npmjs.com/package/@phaser-plus/core)
[![Visit website](https://img.shields.io/badge/Official-Website-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/)
[![Check examples](https://img.shields.io/badge/EXAMPLES-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/examples/)

---

## 🚀 Getting started
```
npx @phaser-plus/cli init my-awesome-game
cd my-awesome-game
npm install
npm start
```

## 🔰 Features
 
 - **GameObjectPool** - Manage the memory of your game by reusing all of the objects needed to draw your scene. @phaser-plus/core provides an API for object reuse. ([example](https://phaser-plus.kalevski.dev/examples))
 
 - **GameObject** - GameObject is a subclass of Phaser.GameObjects.Container that has its own lifecycle and is useful for developing game objects that can be used with GameObjectPool. ([example](https://phaser-plus.kalevski.dev/examples))

 - **Feature** - Feature is a class used to implement your game features in a way that allows them to be reusable in all of your games. ([example](https://phaser-plus.kalevski.dev/examples))

 - **HTMLFeature** - HTMLFeature is a subclass of Feature used for implementing UI using HTML and CSS. ([example](https://phaser-plus.kalevski.dev/examples))

 - **Layer** - @phaser-plus/core#Layer is a subclass of Feature. It has its own camera and container. The container of the layer is only visible to the camera of the layer. ([example](https://phaser-plus.kalevski.dev/examples))

 - **Scene** - @phaser-plus/core#Scene extends Phaser.Scene and adds APIs for managing game features, object pool, service registry, and logger. ([example](https://phaser-plus.kalevski.dev/examples))

 - **Flow** - Efficiently manage your game events, separate your collision logic, chain the events, and avoid using setTimeout or setInterval in your game. ([example](https://phaser-plus.kalevski.dev/examples))

 - **FeatureRegistry** - Divide your game features into separate files and develop them independently. By following this API, you will be able to reuse the game features in all of your games. ([example](https://phaser-plus.kalevski.dev/examples))

 - **ServiceRegistry** - Integrate any external service or API using the service registry and reuse the same instance of the service class in multiple scenes. ([example](https://phaser-plus.kalevski.dev/examples))

 - **LoggerFactory** - LoggerFactory is a factory for creating fancy loggers. ([example](https://phaser-plus.kalevski.dev/examples))



## License

The project is licensed under [MIT License](https://github.com/kalevski/phaser-plus/blob/main/LICENSE)