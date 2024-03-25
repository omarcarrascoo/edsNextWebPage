import React from 'react'
import styles from './eStoreCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EstoreCard() {
  return (
    <div className={styles.eStoreCard}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/eraDigitalSolutionsCard.svg"} alt='E-stores ecommerce online store' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2><span className="clasicBlue">E-STORE</span>, NOT A REGULAR ECOMMERCE</h2>
                <p className="boldParr">Sale everywhere, every time, everything.</p>
                <p className='parr justify'>We don&apos;t just develop online stores; we offer a tailored package to <span className="clasicBlue">automate your shipments, cut commissions, provide financial insights, and offer smart predictions</span> through data analysis to help you make informed decisions that positively impact your business.</p>
                <Link href={"/"} className='underlink'>Learn More</Link>
            </div>
        </div>
    </div>
  )
}

export default EstoreCard
