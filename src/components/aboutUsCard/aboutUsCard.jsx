import React from 'react'
import styles from './aboutUsCard.module.css'
import Image from 'next/image'
function AboutUsCard() {
  return (
    <section className={styles.aboutUsCard}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2>About <span className="clasicBlue">us</span></h2>
                <p className="parr">Our team always seeks to venture into providing services that involve the commercialization of technological innovation. We aim to achieve progress in business care through technology, improving results for entrepreneurs and companies.</p>
                <p className="parr">Era Digital Solution is a company specialized in custom software development, automatization tools, marketing analysis, web page design, landing pages, online stores, and marketplaces.</p>
            </div>
            <div className={styles.imgFraseContainer}>
                <div className={styles.frase}>
                    <p className='parr'>&quot;If you can <span className="clasicBlue">imagine it</span>, we can develop it.&quot;</p>
                </div>
                <div className={styles.imgContainer}>
                    <Image src={"/brain.svg"} alt='Brain to develop digital proyects of era digital solutions' fill/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUsCard
