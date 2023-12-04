import React from 'react'
import styles from './eStoreHero.module.css'
import Link from 'next/link'
import Image from 'next/image'
function EStoreHero() {
  return (
    <section className={styles.eStoreHero}>
        <div className={styles.containaer}>
            <div className={styles.textContainer}>
                <h1><span className='clasicBlue'>SALE</span><br />EVERYWHERE, <br /> EVERY TIME, <br /> EVERYTHING.</h1>
                <p className='parr'>We don't just develop online stores; we offer a tailored package to automate your shipments, cut commissions, provide financial insights, and offer smart predictions through data analysis to help you make informed decisions that positively impact your business.</p>
                <Link href={"/"} className='underlink'>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
              <Image src={"/transCard.svg"} fill alt='E-store card'/>
            </div>
        </div>
    </section>
  )
}

export default EStoreHero
