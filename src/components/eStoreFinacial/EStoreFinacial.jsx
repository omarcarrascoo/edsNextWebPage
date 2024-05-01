import React from 'react'
import styles from './eStoreFinicial.module.css'
import Link from 'next/link'
import Image from 'next/image'
function EStoreFinacial() {
  return (
    <section className={styles.eStoreFinicial}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2>We make your data understandable, get <span className="clasicBlue">profesional finical insight</span> easy and fast.</h2>
                <p className="parr">When prosperity comes, do not use all of it. <br /> -Confucius</p>
                <Link className='underlink' href={"/contact-us"}>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
                <Image src={"/eradigitalsolutionsdashboard.png"} alt='Era digital solutions finicial dashboard' fill/>
            </div>
        </div>
    </section>
  )
}

export default EStoreFinacial
