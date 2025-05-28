import React from 'react'
import Image from 'next/image'
import styles from './eStoreProductMetrics.module.css'
import Link from 'next/link'
function EStoreProductMetrics() {
  return (
    <section className={styles.eStoreProductMetrics}>
        <div className={styles.container}>
            <div className={`${styles.imgContainer} ${styles.mobile}`}>
                <Image className={styles.desktop} src={"/v2.jpg"} fill alt='Get metric of your products with era digital solution'/>
                <Image className={styles.mobile} src={"/v2.jpg"} fill alt='Get metric of your products with era digital solution'/>
            </div>
            <div className={styles.textContainer}>
                <h2>Ecommerce that give you <span className="clasicBlue">metrics</span> of your products</h2>
                <ul>
                    <li>Learn which prices your clients are specting from you.</li>
                    <li>Get to know in which product you client spent more time.</li>
                    <li>Understand why your visits are not making sales.</li>
                    <li>See the engagement of each product.</li>
                    <li>See your visits in a live session.</li>
                    <li>Make promotion based in metrics.</li>
                    <li>Understand where is you traffic coming from.</li>
                    <li>Track the previous pages of your visitors.</li>
                    <li>and much more...</li>
                </ul>
                <Link className='underlink' href={"/contact-us"}>Start selling</Link>
            </div>
            <div className={`${styles.imgContainer} ${styles.desktop}`}>
                <Image className={styles.desktop} src={"/v2.jpg"} fill alt='Get metric of your products with era digital solution'/>
            </div>
        </div>
    </section>
  )
}

export default EStoreProductMetrics
