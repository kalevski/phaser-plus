---
slug: tutorial-phaser-project
title: Tutorial - Create Phaser Project
authors: kalevski
tags: [tutorial]
---

Hi,

this is my first tutorial, so I hope it will be useful for all those who plan to start a new project using Phaser.

As part of a **phaser-plus** project I started recently, there is [@phaser-plus/cli](https://www.npmjs.com/package/@phaser-plus/cli) - a command line tool for creating and developing Phaser projects.

# What is Phaser?
[Phaser](https://phaser.io). is a free and open source software developed and owned by [Richard Davey](https://github.com/photonstorm). You can visit their [funding page](https://www.patreon.com/join/photonstorm) and help them to make Phaser even better.

# How do I make a project?
Before you start creating a project, you need to have **NodeJS 16+** installed on your machine.
If you already have **NodeJS 16+** installed, you can create a project by executing:
```
npx @phaser-plus/cli init --template=phaser my-phaser-game
```

# CLI Features
- Simple setup
- Hot module reload
- Optimized production build
- Support for Web workers