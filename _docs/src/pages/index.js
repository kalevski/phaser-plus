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
                    { title: 'Game flow', description: 'An API attached to the scene for managing game events', image_url: '/img/icons/icon_game_flow.png', image_alt: 'Phaser+ game flow' },
                    { title: 'Perspective 2D', description: 'Create isometric or any other kind of linear transformation easily', image_url: '/img/icons/icon_perspective.png', image_alt: 'Phaser+ Perspective2D'  },
                    { title: 'Features', description: 'Phaser+ provides an API for creating reusable features for your games', image_url: '/img/icons/icon_features.png', image_alt: 'Phaser+ Features'  },
                    // { title: 'Layers', description: 'Separate your game world from game UI using Layers', image_url: '/img/icons/icon_layers.png', image_alt: 'Phaser+ game flow'  },
                    { title: 'Debug', description: 'Inspect game objects, change properties or fire game events while testing the game', image_url: '/img/icons/icon_debug.png', image_alt: 'Phaser+ game flow'  }
                ]} />
            </main>
        </Layout>
    )
}
