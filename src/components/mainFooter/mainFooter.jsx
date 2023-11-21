import React from 'react'
import styles from './mainFooter.module.css'
import Link from 'next/link'
function MainFooter() {
  return (
    <footer className={styles.mainFooter}>
        <p>Copyright ® 2023 Era Digitial Solutions, S.A. de C.V. All rights reserved. | <Link className='whitelink' href={"/"}>Privacy Notice</Link></p>
    </footer>
  )
}

export default MainFooter
