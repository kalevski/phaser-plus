---
sidebar_position: 4
---

# Debugging

Learn how to efficiently debug your game.

**phaser-plus** provides a UI for debugging your game at runtime. The debugger is developed as a separate Feature and needs to be installed before use.

To install the phaser-plus **debugger**, you need to execute the following in your terminal:
```
npm install --save @phaser-plus/debugger
```

After installation, you simply need to register the debugger as a Feature in your phaser-plus Scene:
```js title=scenes/MyScene.js showLineNumbers
import { Scene } from '@phaser-plus/core'
import { Debugger } from '@phaser-plus/debugger'

class MyScene extends Scene {
    onCreate() {
        this.features.register('debugger', Debugger)
    }
}
```

[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=debugging)