import React from 'react'
import DocBreadcrumbs from '@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/styles.module.css'

/**
 * @typedef BreadcrumbItem
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef NavBreadcrumbsProps
 * @property {Array<BreadcrumbItem>} items
 */

/**
 * @param {NavBreadcrumbsProps} props 
 */
const NavBreadcrumbs = (props) => {

    const { items = [] } = props

    return (
        <nav className={DocBreadcrumbs.breadcrumbsContainer}>
            <ul className="breadcrumbs">
                {items.map(item => (
                    <li class="breadcrumbs__item">
                        <a aria-label={item.label} class="breadcrumbs__link" href={item.href}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )

}

export default NavBreadcrumbs