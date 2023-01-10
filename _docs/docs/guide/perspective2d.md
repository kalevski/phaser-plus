---
sidebar_position: 8
---

# Perspective 2D

Create isometric game.

**@phaser-plus/perspective2d** is a set of utilities for creating games with lineary transformed grid.

This library provides API for creating any kind of linear transformation and is capable of changing the transformation on runtime.

One example of using this library is to create isometric game.

Most important classes that are provided by the library are **Scene2D**, **World** and **GameObject2D**:

- **Scene2D** - Extends **@phaser-plus/core#Scene** by adding two layers, world and ui.
- **World** - Extends **@phaser-plus/core#Layer** to support linear transformation and debugging features.
- **GameObject2D** - Extends **@phaser-plus/core#GameObject** by adding additional property called "**transform**" sued to store transformed **x** and **y**.

## How to install

In already created phaser-plus project you need to install additonal dependency by running:
```
npm install --save @phaser-plus/perspective2d
```

## Example

Create a new scene
```js title=scenes/ISOScene.js showLineNumbers
import { Scene2D } from '@phaser-plus/perspective2d'

class ISOScene extends Scene2D {

    onInit() {
        this.world.projection = Structs.Matrix2.createISO(64)
        this.world.debug()
    }

    onCreate() {
        // create your game objects here
    }

}
```

## How to create GameObject2D

The procedure of creating **GameObject2D** is the same as creating **GameObject**, the only difference is that you need to extend from GameObject2D class.

```js title=prefabs/MyIsometricObject.js showLineNumbers
import { GameObject2D } from '@phaser-plus/perspective2d'

class MyIsometricObject extends GameObject2D {

    onCreate() {
        // invoked only once when the object is created or instantiated
    }

    onAdd(parent) {
        // invoked when the object is added as a child of another GameObject or Layer
    }

    onUpdate(time, delta) {
        // invoked on each frame while the object is a child of another game object
    }

    onRemove(parent) {
        // invoked when the object is removed from the parent
    }

    onDestroy() {
        // invoked when the object is destroyed
    }

}
```

## add GameObject2D to Scene2D

```js title=scenes/ISOScene.js showLineNumbers
import { Scene2D } from '@phaser-plus/perspective2d'
import MyIsometricObject from './prefabs/MyIsometricObject.js'

class ISOScene extends Scene2D {

    onInit() {
        this.world.projection = Structs.Matrix2.createISO(64)
        this.world.debug()
    }

    onCreate() {
        this.world.register('iso-object', MyIsometricObject)

        // this line will add object in the scene on x:5, y:5
        let myObject = this.world.add('iso-object', 5, 5)
    
        // you can remove the object from scene using
        this.world.remove(myObject)

    }

}
```

:::note
Scene2D is using Game Object Pool by default
:::
[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=iso-scene)