import React from 'react'
import styles from './eWebHero.module.css'
import Link from 'next/link'
import Image from 'next/image'
function EWebHero() {
  return (
    <section className={styles.eWebHero}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1><span className="clasicBlue">WE DON’T </span>MAKE WEB PAGES</h1>
                <h2>We create a powerful marketing tool to track your web page metrics!</h2>
                <p className={`parr ${styles.light}`}>With an E-WEB, gain insights into your visitors, understand your audience, and get a sense of what they expect. <span className={styles.mobile}>Track your visits and calls to action, and identify areas where your page may be falling short.</span></p>
                <Link className='underlink' href={"/"}>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
            <Image src={"/ewebDash.png"} alt='E Web Dashboard a dasho¿board to administrate your web page' fill/>
           </div>
        </div>
        
    </section>
  )
}

export default EWebHero
