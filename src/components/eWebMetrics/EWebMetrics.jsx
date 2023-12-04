import React from 'react'
import styles from './eWebMetrics.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EWebMetrics() {
  return (
    <section className={styles.eWebMetrics}>
      <div className={styles.container}>
        <h2>ERA DIGITAL SOLUTIONS GIVE YOU THE <span className="clasicBlue">IMPORTANT METRICS FOR YOUR MARKETING</span> ANALISIS.</h2>
        <p>Understand how user interact with your page.</p>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <Image src={"/time.svg"} alt='Metric of your visitors spending time on your page' fill/>
            </div>
            <div className={styles.textContainer}>
              <p>Get to know where your visitors spend more time. And how you can reatain more clients in your web page.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <Image src={"/click.svg"} alt='Metric of your web pages clicks' fill/>
            </div>
            <div className={styles.textContainer}>
              <p>Learn which pages are making sales and understand why it has good web conversion rates.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <Image src={"/http.svg"} alt='Metric of your visitors spending time on yuou page' fill/>
            </div>
            <div className={styles.textContainer}>
              <p>Get to know where is your client coming from, and how your clients are arriving to your page.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <Image src={"/computers.svg"} alt='Understand the interaction of your client with your services' fill/>
            </div>
            <div className={styles.textContainer}>
              <p>Understand the interaction of your client with your services, and get to know the their interests</p>
            </div>
          </div>
        </div>
        <Link className='cbtn' href={"/"}>Start Planning</Link>
      </div>
    </section>
  )
}

export default EWebMetrics
