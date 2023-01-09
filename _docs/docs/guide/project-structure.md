---
sidebar_position: 1
---

# Project structure

Proposed folder structure for large game projects:

Phaser does not enforce any particular pattern for writing complex applications, so developers are free to choose the design pattern that works best for them. There is no "best project architecture" that will fit every project and coding style, but it is always important to structure your project in a logical and organized manner.

The following is a proposed folder structure that may work well in many cases, but it is not intended to be followed strictly. You should adapt it to meet the needs of your specific project.

```
 ─ public
   └─ assets - directory for assets of your game (textures, audio files, bitmap fonts, etc.)
 ─ src
   ├─ index.js - entrypoint of the application
   ├─ index.html - html index file
   ├─ config.js - phaser config file
   ├─ scenes - directory for the scenes of the game
   ├─ features - directory used to store game features
   ├─ prefabs - directory for all your game objects
   ├─ services - integrate external services inside this directory
   └─ events - separate all game events into dedicated classes inside this directory
 ─ package.json
```

