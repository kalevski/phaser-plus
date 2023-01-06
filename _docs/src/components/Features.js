import React from 'react'
import clsx from 'clsx'
import ContentWrapper from './ContentWrapper'

import styles from './Features.module.css'

/**
 * @typedef Feature
 * @property {string} image_url
 * @property {string} image_alt
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef FeatureBlockProps
 * @property {Feature} feature
 */

/**
 * @typedef FeatureProps
 * @property {Array<Feature>} list
 */

/**
 * 
 * @param {FeatureBlockProps} props 
 */
const FeatureBlock = (props) => {
    const {
        image_url,
        image_alt,
        title,
        description
    } = props.feature
    return (
        <div className={clsx(styles.feature_block)}>
            <img src={image_url} className={clsx(styles.feature_icon)} alt={image_alt} />
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

/**
 * 
 * @param {FeatureProps} props 
 * @returns 
 */
const Features = (props) => {
    
    const { list = [] } = props
    
    return (
        <ContentWrapper theme="dark">
            <div className={clsx('container')}>
                <div className={clsx('row')}>
                    <div className={clsx('col col--12')}>
                        <h3 className={clsx(styles.h_special)}>Features</h3>
                    </div>
                    {list.map((feature, index) => <div key={index} className="col col--3">
                        <FeatureBlock feature={feature} />
                    </div>)}
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Features