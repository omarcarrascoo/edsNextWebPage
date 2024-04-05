import React from 'react'
import styles from './AppDevelopmentUx.module.css'
import Link from 'next/link'
import Image from 'next/image'
function AppDevelopmentUx() {
  return (
    <section className={styles.eStoreFinicial}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/appUx.png"} alt='Era digital solutions Application UX and UI optimization' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2><span className="clasicBlue">Crafting Unforgettable Experiences:</span> Elevate Your App with Expert UX Optimization</h2>
                <p className="parr">
                    Transform your app into an intuitive masterpiece. We understand the critical role user experience plays in the success of your application. We ensure seamless navigation, effortless interaction, and captivating visuals
                </p>
                <Link className='underlink' href={"/"}>Start Planning</Link>
            </div>
            
        </div>
    </section>
  )
}

export default AppDevelopmentUx
