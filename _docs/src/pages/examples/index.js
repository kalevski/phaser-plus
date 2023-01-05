import React from 'react'
import Layout from '@theme/Layout'
import { getAllScenes } from '@phaser-plus/examples'
import PageHeader from '../../components/PageHeader'
import CardGrid from '../../components/CardGrid'

const layout = {
    title: 'Examples',
    description: 'Tools and extensions to make HTML5 game development easier and fun using PhaserJS',
}

export default function Examples() {
    
    let items = getAllScenes().map(entry => {
        return {
            title: entry.title,
            imageUrl: entry.imageUrl,
            imageAlt: entry.imageAlt,
            link: `/examples/run?demo=${entry.slug}`
        }
    })
    
    return (
        <Layout title={layout.title} description={layout.description}>
            <PageHeader />
            <main>
                <CardGrid items={items} />
            </main>
        </Layout>
    )
}