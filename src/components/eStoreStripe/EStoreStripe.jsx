import React from 'react'
import styles from './eStoreStripe.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EStoreStripe() {
  return (
    <section className={styles.eStoreStripe}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/stripeLogo.png"} alt='Stripe Logo no commisions ecommerce' fill/>
            </div>
            <h2>Era digital solutions don&apos;t charge <span className={styles.purple}>commissions on your sales</span></h2>
            <p className="parr">You just get the 3% charge by stripe the best payment processor used by amazon, google, shopify, kickstarter, indochino...</p>
            <Link className={`${styles.purple} underlink`} href={"/contact-us"}>Start selling without commisions</Link>
        </div>
    </section>
  )
}

export default EStoreStripe
