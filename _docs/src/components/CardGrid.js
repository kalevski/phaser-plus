import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'

import styles from './CardGrid.module.css'

/**
 * @typedef Card
 * @property {string} title
 * @property {string} color
 * @property {string} imageUrl
 * @property {string} imageAlt
 * @property {string} link
 */


/**
 * @typedef CardGridProps
 * @property {Array<Card>} items
 */

/**
 * @typedef CardProps
 * @property {Card} item
 */



/**
 * @param {CardProps} props
 */
const Card = (props) => {
    const { item } = props
    const {
        title,
        imageUrl,
        imageAlt,
        link
    } = item || {}
    return (
        <div className={styles.card_container}>
            <Link to={link}>
                <div className={styles.card}>
                    <div className={styles.card_img}>
                        <img src={imageUrl} alt={imageAlt} />
                    </div>
                    <div className={styles.card_title}>
                        <h3>{title}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}

/**
 * @param {CardGridProps} props 
 */
const CardGrid = (props) => {

    const { items = [] } = props

    return (
        <div className="container">
            <div className="row">
                {items.map((item, index) => <div key={index} className={clsx('col col--4')}><Card item={item} /></div>)}
            </div>
        </div>
    )

}

export default CardGrid