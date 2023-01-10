---
sidebar_position: 5
---

# Game events

Separate your game logic into game events using **flow**.

phaser-plus comes with a mechanism for organizing your game logic in game events. **Flow** provides three event types at the moment:

- **Event** - A game event that can be fired manually with a delay.
- **TimeEvent** - - A game event that is fired on an interval, with a delay on start.
- **CollisionEvent** - A MatterJS collision event that is fired when two labeled physics objects are colliding.

## Events
To create a game event you need to create a subclass that extends **Flow.Event** and implement **onFire** method.

```js title=events/MyGameEvent.js showLineNumbers
import { Flow } from '@phaser-plus/core'

class MyGameEvent extends Flow.Event {
    
    onCreate() {
        // invoked when the event is added
    }
    
    onFire(payload) {
        // do something
    }

    onDestroy() {
        // invoked when the event is removed
    }
}
```

```js
this.flow.events.add('my-game-event', MyGameEvent) // register the event
```

```js
// this line of code will trigger "my-game-event" after 2.5 seconds
this.flow.events.trigger('my-game-event', 'payload', 2.5)
```
[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=game-events)

## Time Events
Good example for time events is day-night cycle, in that cases you need to have a time event that detects the day time inside your game and invoke other game events in particular game time.
To implement that kind of feature you need to create class that extends Flow.TimeEvent

```js title=events/MyDayNightCycle.js showLineNumbers
import { Flow } from '@phaser-plus/core'

class MyDayNightCycle extends Flow.TimeEvent {
    
    onCreate() {
        // invoked when the event is added
    }

    onFire(times) {
        // do something
    }

    onDestroy() {
        // invoked when the event is removed
    }
}
```

```js
/**
 * the MyDayNightCycle will be at 1 second interval
 * the first time will be invoked after 3 seconeds
 */

this.flow.timer.add('day-night-cycle', MyDayNightCycle, 1, 3)
```
[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=time-events)

## Collision Events (MatterJS)

:::note
At the momment, **Flow.CollisionEvent** works only with MatterJS
:::

When you are working on larger game you need a way to separate collision events depending on object whitch objects are colliding.

For that reason, Flow provides an API for registering multiple collision events.

Implementation of collision event look like this:
```js title=events/PlayerHitEnemyEvent.js showLineNumbers
class PlayerHitEnemyEvent extends Flow.CollisionEvent {

    onCreate() {
        // invoked when the event is added
    }

    onEnter(bodyA, bodyB, event) {
        // invoked when collision starts
    }

    onExit(bodyA, bodyB, event) {
        // invoked when collision ends
    }

    onDestroy() {
        // invoked when the event is removed
    }

}
```

```js
this.flow.physics.add('player-hit-enemy', PlayerHitEnemyEvent)

this.flow.physics.setCollision('player', 'enemy1', 'player-hit-enemy')
this.flow.physics.setCollision('player', 'enemy2', 'player-hit-enemy')

/**
 * player-hit-enemy event will be triggered when physics object labeled as "player"
 * collides with objects labbeled as "enemy1" or "enemy2"
 */
```
[![Check example](https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge)](/examples/run?demo=collision-events)
