import React from 'react'
import Layout from '@theme/Layout'
import { useLocation } from '@docusaurus/router'
import { getScene } from '@phaser-plus/examples'

import PageHeader from '../../components/PageHeader'
import PhaserExample from '../../components/PhaserExample'

const layout = {
    title: 'Examples',
    description: 'Tools and extensions to make HTML5 game development easier and fun using PhaserJS',
}

export default function RunDemo() {
    const location = useLocation()
    let url = new URL(`http://phaser-plus.kalevski.dev${location.pathname}${location.search}`)
    
    let entry = getScene(url.searchParams.get('demo'))
    console.log(entry)
    
    return (
        <Layout title={layout.title} description={layout.description}>
            <PageHeader
                title={entry.title}
                description={entry.description}
            />
            <main>
                <PhaserExample entry={entry} />
            </main>
        </Layout>
    )
}