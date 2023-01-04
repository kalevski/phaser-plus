import React from 'react'
import Layout from '@theme/Layout'

const layout = {
    title: 'Examples',
    description: 'Rivalis official exaples',
}

export default function Examples() {
    return (
        <Layout title={layout.title} description={layout.description}>
            header
            <main>
                main
            </main>
        </Layout>
    )
}