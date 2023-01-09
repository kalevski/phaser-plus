---
sidebar_position: 2
---

# Create game object

Learn how to create game objects and reuse them.

**phaser-plus** provides a subclass of **Phaser.GameObjects.Container** with its own lifecycle and API for the object pool pattern.

## GameObject class

**GameObject** is a class that extends **Phaser.GameObjects.Container** to provide a lifecycle inside the class (onCreate, onAdd, onRemove, onUpdate, onDestroy). It also has a unique identifier property called id.

```js title=prefabs/MyGameObject.js showLineNumbers
import { GameObject } from '@phaser-plus/core'

class MyGameObject extends GameObject {

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

export default MyGameObject
```

[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/)

## Game Object Pool

**@phaser-plus/core#Scene** provides pool API for managing game object instances.
