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
:::note
**GameObject** lifecycle moethds are invoked if the **GameObject** is added as a child of another GameObject or **Layer**, To learn more about layers go to [next guide](/docs/guide/scene-layers).
:::


## Game Object Pool

**@phaser-plus/core#Scene** provides pool API for managing game object instances.
A game object pool can help boost game performance and reduce the workload on the garbage collector.

To use the Game Object Pool, you first need to register the **GameObject**. This can be done by executing:
```js
this.pool.register('my-game-object', MyGameObject)
```

After registration, you can use the **obtain** method to get an object from the pool.

```js
let myGameObject = this.pool.obtain('my-game-object') // returns instance of MyGameObject 
```

When you need to remove a game object from the scene, simply remove it from the parent container and execute:
```js
this.pool.release(myGameObject)
```

[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=create-game-objects)