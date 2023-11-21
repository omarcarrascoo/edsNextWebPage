import React from 'react'
import styles from './mainHeader.module.css'
function MainHeader() {
  return (
    <header className={styles.mainHeader}>
        <div className={styles.container}>
            <p><span className={styles.blue}>ERA |</span> DIGITAL SOLUTIONS</p>
            <nav className={styles.mainNav}>
                <ul>
                    <li>Home</li>
                    <li>Products</li>
                    <li>About us</li>
                    <li>Blog</li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default MainHeader
