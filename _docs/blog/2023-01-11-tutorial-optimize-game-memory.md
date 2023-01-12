---
slug: tutorial-optimize-game-memory
title: Tutorial - Optimizing Memory Consumption in HTML5 Games
authors: kalevski
tags: [tutorial]
---

Welcome to my blog post about improving game performance through the use of Object pools.

As a game developer, it's likely that you've had to deal with the problem of instantiating a large number of objects for a specific class, such as particles with a short lifetime that need to be destroyed. One of the challenges of this type of game logic is that JavaScript's model is based on the garbage collection pattern, which means that developers do not have direct control over allocated memory.

# Problem

When memory locations (variables) are marked as null, they are collected by the garbage collector and removed from memory. However, when the garbage collector needs to dispose of a lot of objects, it takes a lot of processing time, which can negatively impact the performance of the game.

In that case, if you profile the memory, you will see something like what is shown in the picture below

![before](https://user-images.githubusercontent.com/10467454/211951892-46ea9408-e75d-4804-9229-324a557c515b.jpg)

# Solution

But there's a solution to this problem, and it's called the Object pools pattern.

The Object pools pattern is an implementation that helps to reuse disposed objects instead of creating new ones. By reusing objects, we can reduce the number of objects that need to be created and collected by the garbage collector, which in turn improves the performance of the game.

After using Object pools, you will get results like this

![after](https://user-images.githubusercontent.com/10467454/211951895-162e0910-6e3c-414d-8f40-0e47a5860dca.jpg)

# Phaser Plus Object Pools

```js
class CreateGameObjects extends Scene {

    onCreate() {
        this.pool.register('myObject', MyObject)

        // create object using pool
        let turtle = this.pool.obtain('myObject')
        this.add.existing(turtle)

        // remove object from scene and retreive back to the pool
        this.children.remove(turtle)
        this.pool.release(turtle)
    }
    
}
```