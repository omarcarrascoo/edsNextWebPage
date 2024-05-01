import React from 'react'
import styles from './appDevelopmentBouth.module.css'
import Link from 'next/link'
import Image from 'next/image'
function AppDevelopmentBouth() {
  return (
    <section className={styles.eStoreFinicial}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2>We make <span className="clasicBlue">IOS and Android</span> development</h2>
                <p className="parr">
                  Unlock the potential of both iOS and Android platforms with experts in mobile development. Whether you&apos;re targeting Apple&apos;s loyal user base or the vast Android market, we&apos;ve got you covered from concept to launch,
                </p>
                <Link className='underlink' href={"/contact-us"}>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
                <Image src={"/iosAndroid.png"} alt='Ios and Android Logos Combined Era Digtial Solutions' fill/>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentBouth
