import React from 'react'
import styles from './aboutAgile.module.css'
import Image from 'next/image'
import Link from 'next/link'
function AboutAgile() {
  return (
    <section className={styles.aboutAgile}>
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <Image src={"/calendar.svg"} alt='Calendar to boost your eficiency with era digital solutions tools' fill/>
                </div>
                <div className={styles.textContainer}>
                <h3>How we work</h3>
                <p className='parr'>Our team works under <span className="clasicBlue">agile software development methodologies</span> which seek to provide small pieces of working software in a short time to increase customer satisfaction.</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <Image src={"/rows.svg"} alt='boost your eficiency contacting with era digital solutions' fill/>
                </div>
                <div className={styles.textContainer}>
                <h3>Don&apos;t know <span className="clasicBlue">where to start?</span></h3>
                <p className='parr'>The digital age is confusing. Get in touch with us and we will be happy to advise you 100% free.</p>
                </div>
            </div>
            <Link href={'/'} className='underlink'>Contact Us</Link>
        </div>
    </section>
  )
}

export default AboutAgile
