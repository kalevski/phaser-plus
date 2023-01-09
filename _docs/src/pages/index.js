import React from 'react'
import Layout from '@theme/Layout'
import HeroHeader from '../components/HeroHeader'
import WaveDecor from '../components/WaveDecor'
import WideCodeBlock from '../components/WideCodeBlock'
import Features from '../components/Features'

const layout = {
    title: 'Extensions to make PhaserJS more awesome',
    description: 'Tools and extensions to make HTML5 game development easier and fun using PhaserJS',
    keywords: ''
}

export default function Home() {
    return (
        <Layout title={layout.title} description={layout.description}>
            <HeroHeader
                title="Phaser Plus"
                description="Set of open source utilities and tools built on top of PhaserJS"
                version="Phaser Plus: 0.x / Phaser: 3.52.2"
                button_label="Getting started"
                button_url="/docs/intro"
                image_url="/img/gfx-phaser-plus.png"
            >
                <WaveDecor />
            </HeroHeader>
            <main>
                <WideCodeBlock />
                <Features list={[
                    { title: 'Game flow', description: 'Separate your game logic into game events and chain them using game flow API.', image_url: '/img/icons/icon_game_flow.png', image_alt: 'Phaser+ game flow' },
                    { title: 'Perspective 2D', description: 'Create a linearly transformed grid and place your scene objects on it easily. Good for isometric games.', image_url: '/img/icons/icon_perspective.png', image_alt: 'Phaser+ Perspective2D'  },
                    { title: 'Features', description: 'Easily reuse features from one game to another using the Feature API.', image_url: '/img/icons/icon_features.png', image_alt: 'Phaser+ Features'  },
                    { title: 'Debug', description: 'Inspect game objects, change properties, or fire game events while testing the game.', image_url: '/img/icons/icon_debug.png', image_alt: 'Phaser+ game flow'  }
                ]} />
            </main>
        </Layout>
    )
}
