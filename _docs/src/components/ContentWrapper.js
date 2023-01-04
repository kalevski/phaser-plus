import React from 'react'
import clsx from 'clsx'

import styles from './ContentWrapper.module.css'

export default ({ theme = 'transparent', children }) => (
    <div className={clsx(styles[`theme_${theme}`])}>
        {children}
    </div>
)