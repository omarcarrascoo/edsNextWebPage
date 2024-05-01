import React from 'react'
import styles from './AppDevelopmentReview.module.css'
import Image from 'next/image'
import Link from 'next/link'
function AppDevelopmentReview() {
  return (
    <section className={styles.eStoreSkull}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/detective.svg"} alt='Era Digital Solutions Application rewards for my clients' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2>REAL TIME UPDATE WHILE DEVELOPMENT</h2>
                <p className='parr'>
                    Real-time updates during development ensure you&apos;re always informed about the state of your project. From initial design to final implementation, you&apos;ll have a clear picture of progress at every stage. Stay in the loop, make informed decisions, and watch your vision come to life with confidence.
                </p>
                <Link href={"/"} className='cbtn'>Start Planning</Link>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentReview
