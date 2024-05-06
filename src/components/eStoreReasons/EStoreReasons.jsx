import React from 'react'
import styles from './eStoreReasons.module.css'
import Image from 'next/image'
function EStoreReasons() {
  return (
    <section className={styles.eStoreReasons}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image alt='Five Reasons to have an online store or ecommerce with era digital solutions' src={"/moneyGuy.svg"} fill/>
            </div>
            <div className={styles.textContainer}>
                <h2><span className="clasicBlue">5 Reason</span> to have an online store/e-commerce</h2>
                <div className={styles.reasonsContainer}>
                    <div className={styles.reason}>
                        <h3 className='clasicBlue'>1.Sell every time</h3>
                        <p className='parr'>The 58% of the persons that buy online make it because they can buy at any time.</p>
                    </div>
                    <div className={styles.reason}>
                        <h3 className='clasicBlue'>2.The online sells grow a 25% since 2022</h3>
                        <p className='parr'>The online commerce make a new record in 2022 with more than 72.000 millions of euros, 25% more than the previous year.</p>
                    </div>
                    <div className={styles.reason}>
                        <h3 className='clasicBlue'>3. Get feed back of your clients</h3>
                        <p className='parr'>The 58% of the persons that buy online make it because they can buy at any time.</p>
                    </div>
                    <div className={styles.reason}>
                        <h3 className='clasicBlue'>4. Win clients in others stores</h3>
                        <p className='parr'>The 65% of the consumers compare prices in internet while their are in a physic store.</p>
                    </div>
                    <div className={styles.reason}>
                        <h3 className='clasicBlue'>5. Online selling is easy</h3>
                        <p className='parr'>The 4.6% of visitors of a online store convert on a sale, you just need the correct tools to conquer the digital era.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EStoreReasons
