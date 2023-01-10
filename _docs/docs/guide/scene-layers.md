---
sidebar_position: 3
---

# Scene Layers

Learn how to organize multiple scene layers.

`@phaser-plus/core#Layer` !== `Phaser.GameObjects.Layer`

**phaser-plus** Layer is a subclass of Feature implemented to have a dedicated container and camera that only displays its own container.

Layers are useful for dividing, for example, the UI from the game world.

```js title=layers/UILayer.js showLineNumbers
import { Layer } from '@phaser-plus/core'

class UILayer extends Layer {

    onCreate() {
        // add objects to this.container
    }

    onUpdate(time, delta) {
        // invoked on each frame
    }

    onDestroy() {
        // invoked when the layer is destroyed
    }

}
```

To add the layer to the scene, you need to execute the following code:
```js
let layer = this.features.register('ui-layer', UILayer)
```

[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=scene-layers)