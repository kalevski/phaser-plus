import React from 'react'
import Layout from '@theme/Layout'
import PageHeader from '../../components/PageHeader'
import CardGrid from '../../components/CardGrid'
import BrowserOnly from '@docusaurus/BrowserOnly'

const layout = {
    title: 'Examples',
    description: 'Tools and extensions to make HTML5 game development easier and fun using PhaserJS',
}

export default function Examples() {
    
    return (
        <Layout title={layout.title} description={layout.description}>
            <PageHeader title="Phaser Plus Examples" description="" />
            <main>
                <BrowserOnly>
                {() => {
                    const getAllScenes = require('@phaser-plus/examples').getAllScenes
                    let items = getAllScenes().map(entry => {
                        return {
                            title: entry.title,
                            imageUrl: entry.imageUrl,
                            imageAlt: entry.imageAlt,
                            link: `/examples/run?demo=${entry.slug}`
                        }
                    })
                    return <CardGrid items={items} />
                }}
                </BrowserOnly>
            </main>
        </Layout>
    )
}