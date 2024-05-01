import React from 'react'
import styles from './appDevelopmentRewards.module.css'
import Image from 'next/image'
import Link from 'next/link'
function AppDevelopmentRewards() {
  return (
    <section className={styles.eStoreSkull}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/rewards.svg"} alt='Era Digital Solutions Application rewards for my clients' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2>Give rewards to your clients</h2>
                <p className='parr'>
                    With a business application, you can elevate the customer experience by introducing point rewards, coupons, exclusive benefits, and any dynamic marketing strategy you can imagine.
                    From personalized discounts to exclusive offers, the possibilities are limitless, ensuring your brand stays ahead in engaging and delighting your customers.
                </p>
                <Link href={"/contact-us"} className='cbtn'>Start Planning</Link>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentRewards
