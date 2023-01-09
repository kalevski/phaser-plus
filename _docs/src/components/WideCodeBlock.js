import React from 'react'
import clsx from 'clsx'
import CodeBlock from '@theme/CodeBlock'
import ContentWrapper from './ContentWrapper'

import styles from './WideCodeBlock.module.css'

const WideCodeBlock = () => {
    return (
        <ContentWrapper theme="light">
            <div className="container">
                <div className="row">
                    <div className={clsx('col col--6 col--offset-3', styles.code_block)}>
                        <h2 className={styles.code_block_title}>Create your first project</h2>
                        <CodeBlock language="bash">npx @phaser-plus/cli init my-awesome-game</CodeBlock>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    )
}

export default WideCodeBlock