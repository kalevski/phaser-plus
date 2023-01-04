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
                title="Phaser+ HTML5 game dev library"
                description="Set of open source utilities and tools built on top of PhaserJS"
                version="Phaser plus: 0.x / Phaser: 3.52.2"
                button_label="Getting started"
                button_url="/docs/intro"
                image_url="/img/gfx-phaser-plus.png"
            >
                <WaveDecor />
            </HeroHeader>
            <main>
                <WideCodeBlock />
                <Features list={[
                    { title: 'Extended scene', description: 'Phaser+ scene provides API that helps you structure and organize your project in easy and simple way.' },
                    { title: 'Game flow', description: 'An API attached to the scene for managing game events' },
                    { title: 'Perspective 2D', description: 'Create isometric or any other kind of linear transformation easily' },
                    { title: 'Features', description: 'Phaser+ provides an API for creating reusable features for your games' },
                    { title: 'Layers', description: 'Separate your game world from game UI using Layers' },
                    { title: 'Debug', description: 'Inspect game objects, change properties or fire game events while testing the game' }
                ]} />
            </main>
        </Layout>
    )
}
