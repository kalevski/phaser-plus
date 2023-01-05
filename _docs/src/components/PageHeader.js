import React from 'react'
import clsx from 'clsx'

import styles from './PageHeader.module.css'

/**
 * @typedef PageHeaderProps
 * @property {string} title
 * @property {string} description
 */

/**
 * @param {PageHeaderProps} props 
 */
const PageHeader = (props) => {

    const {
        title = '[TITLE HERE]',
        description = '[DESCRIPTION HERE]'
    } = props

    return (
        <header className={styles.header}>
            <div className="container">
                <div className="row">
                    <div className={clsx('col col--6 col--offset-3')}>
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className={clsx('col col--6 col--offset-3')}>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </header>
    )

}

export default PageHeader