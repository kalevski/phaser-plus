import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'

import styles from './HeroHeader.module.css'

/**
 * @typedef HeroHeaderProps
 * @property {string} title
 * @property {string} description
 * @property {string} button_label
 * @property {string} button_url
 * @property {string} image_url
 * @property {string} image_alt
 */

/**
 * 
 * @param {HeroHeaderProps} props 
 */
const HeroHeader = (props) => {

    const {
        title = '[YOUR TITLE HERE]',
        description = '[YOUR DESCRIPTION HERE]',
        version = '[YOUR VERSION HERE]',
        button_label = '[BUTTON LABEL HERE]',
        button_url = '#',
        image_url = '',
        image_alt = '',
        children
    } = props

    return (
        <header className={styles.hero_header}>
            <div className={styles.hero_background}>
                <div id="canvas"></div>
            </div>
            <div className="container">
                {children}
                <div className="row">
                    <div className={clsx('col col--6')}>
                        <div className={styles.hero_text}>
                            <h1>{title}</h1>
                            <h3>{description}</h3>
                            <h4 className={styles.version_text}>{version}</h4>
                            <Link className={clsx('button button--outline button--primary button--lg', styles.hero_button)} to={button_url}>{button_label}</Link>
                        </div>
                    </div>
                    <div className={clsx('col col--6')}>
                        <img src={image_url} alt={image_alt} />
                    </div>
                </div>
            </div>
        </header>
    )

}

export default HeroHeader