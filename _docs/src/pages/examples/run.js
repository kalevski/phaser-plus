import React from 'react'
import Layout from '@theme/Layout'
import BrowserOnly from '@docusaurus/BrowserOnly'

const layout = {
    title: 'Examples',
    description: 'Tools and extensions to make HTML5 game development easier and fun using PhaserJS',
}

export default function RunDemo() {
    
    
    return (
        <Layout title={layout.title} description={layout.description}>
            <BrowserOnly>
                {() => {
                    let getScene = require('@phaser-plus/examples').getScene
                    let url = new URL(window.location.href)
                    let slug = url.searchParams.get('demo')
                    let entry = getScene(slug)

                    const PhaserExample = require('../../components/PhaserExample').default
                    const PageHeader = require('../../components/PageHeader').default
                    const NavBreadcrumbs = require('../../components/NavBreadcrumbs').default
                    return entry === null ? (<></>) : (
                        <>
                            <PageHeader
                                title={entry.title}
                                description={entry.description}>
                                <NavBreadcrumbs items={[
                                    { label: 'Examples', href: '/examples' },
                                    { label: entry.title, href: `/examples/run?demo=${entry.slug}` }
                                ]} />
                            </PageHeader>
                            
                            <main>
                                <PhaserExample entry={entry} />
                            </main>
                        </>
                    )
                }}
            </BrowserOnly>
        </Layout>
    )
}