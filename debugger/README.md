# @phaser-plus/debugger
[![GitHub](https://img.shields.io/github/license/kalevski/phaser-plus?style=for-the-badge)](https://github.com/kalevski/phaser-plus/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@phaser-plus/debugger?color=teal&label=VERSION&style=for-the-badge)](https://www.npmjs.com/package/@phaser-plus/debugger)
[![npm downloads](https://img.shields.io/npm/dw/@phaser-plus/debugger?label=downloads&style=for-the-badge)](https://www.npmjs.com/package/@phaser-plus/debugger)
[![Visit website](https://img.shields.io/badge/Official-Website-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/)
[![Check examples](https://img.shields.io/badge/EXAMPLES-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/examples/)


**@phaser-plus/debugger** is a feature developed on top of **@phaser-plus/core**.

This package provides a UI and API for debugging.

---

## 🚀 Getting started
```
npm install --save @phaser-plus/debugger
```

```js
import { Scene } from '@phaser-plus/core'
import { Debugger } from '@phaser-plus/debugger'

class MyScene extends Scene {

    onCreate() {
        this.features.register('debugger', Debugger)
    }

}
```
[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](https://phaser-plus.kalevski.dev/examples/)


## 🔰 Features
 - Take a screenshot of your game
 - Record a video of your game
 - Fire a game event while playing the game
 - Inspect an object and change basic parameters such as position, rotation, and scale





## License

The project is licensed under [MIT License](https://github.com/kalevski/phaser-plus/blob/main/LICENSE)