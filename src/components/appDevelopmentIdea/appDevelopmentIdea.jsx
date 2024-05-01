import React from 'react'
import styles from './appDevelopmentIdea.module.css'
import Image from 'next/image'
import Link from 'next/link'
function AppDevelopmentIdea() {
  return (
    <section className={styles.eStoreSkull}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/idea.svg"} alt='Era Digital Solutions Bespoke Aplication Idea Development' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2><span className='clasicBlue'>Innovation is the key </span> for every business to survive in this digital era</h2>
                <p className='parr'>
                    Big businesses know that the best way to connect with active clients is by creating an app. In today&apos;s digital world, an app isn&apos;t just a tool – it&apos;s a way to offer personalized experiences and make interactions seamless. By embracing apps, you can build strong connections with your audience and take your brand to new heights.
                </p>
                <Link href={"/contact-us"} className='cbtn'>Start Planning</Link>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentIdea
