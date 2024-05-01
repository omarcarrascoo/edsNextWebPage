import React from 'react'
import styles from './appDevelopmentHero.module.css'
import Link from 'next/link'
import Image from 'next/image'
function AppDevelopmentHero() {
  return (
    <section className={styles.eStoreHero}>
        <div className={styles.containaer}>
            <div className={styles.textContainer}>
                <h1>The best victory is being in your customer&apos;s pocket.</h1>
                <p className='parr'>We develop build to suit <span className='clasicBlue'>IOS and Android applications</span> designed to skyrocket your success.</p>
                <Link href={"/contact-us"} className='underlink'>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
              <Image src={"/robotApp.png"} fill alt='E-store card'/>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentHero
