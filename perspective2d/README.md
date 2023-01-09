# @phaser-plus/perspective2d
[![GitHub](https://img.shields.io/github/license/kalevski/phaser-plus?style=for-the-badge)](https://github.com/kalevski/phaser-plus/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@phaser-plus/perspective2d?color=teal&label=VERSION&style=for-the-badge)](https://www.npmjs.com/package/@phaser-plus/perspective2d)
[![npm downloads](https://img.shields.io/npm/dw/@phaser-plus/perspective2d?label=downloads&style=for-the-badge)](https://www.npmjs.com/package/@phaser-plus/perspective2d)
[![Visit website](https://img.shields.io/badge/Official-Website-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/)
[![Check examples](https://img.shields.io/badge/EXAMPLES-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/examples/)

---

**@phaser-plus/perspective2d** is a feature developed on top of **@phaser-plus/core**.

This package provides an API for easily creating games with a linearly transformed projection.

## 🚀 Getting started

```
npm install --save @phaser-plus/perspective2d
```

```js
import { Scene2D } from '@phaser-plus/perspective2d'

class MyScene extends Scene2D {

    onInit() {
        this.world.debug()
    }

    onCreate() {}

}
```

## 🔰 Features
 - **Scene2D** - Subclass of @phaser-plus/core#Scene that has two layers: "world" and "ui". It is developed to provide features for creating games using a linearly transformed coordinate system and is good for isometric games.  ([example](https://phaser-plus.kalevski.dev/examples))
 - **GameObject2D** - Subclass of @phaser-plus/core#GameObject that is extended to support transformation depending on the projection created by the scene.  ([example](https://phaser-plus.kalevski.dev/examples))

## License

The project is licensed under [MIT License](https://github.com/kalevski/phaser-plus/blob/main/LICENSE)