import React from 'react'
import styles from './vivianaCard.module.css'
import Link from 'next/link'
import Image from 'next/image'
function VivianaCard() {
  return (
    <div className={styles.vivianaCard}>
        <div className={styles.container}>
            <h2 className='subtitle1'>VIVIANA SALES FUNNEL</h2>
            <p className={`parr center ${styles.parrFunnelCard}`}>Experience a powerful marketing tool designed to simplify the sales funnel to everyone. Receive a comprehensive analysis of your campaign with easily understandable data. Gain professional marketing insights quickly and effortlessly.</p>
            <Link className='underlink' href={"/"}>Learn More</Link>
            <div className={styles.grid}>
               <div className={styles.left}>
               <div className={styles.socialMedia}>
                    <Image src={'/instagram.png'} alt='Instagram logo viviana sales funel' width={180} height={180}/>
                    <div className={styles.socialText}>
                        <h3>Connect your social media accounts easy and fast.</h3>
                        <p className='none'>
                        VIVIANA conducts <span className="clasicBlue">real-time analysis on the insights of your social accounts</span>, enabling you to make informed decisions and understand where your campaign stands.
                        </p>
                    </div>
                    
                </div>
                <div className={styles.socialMedia}>
                    <Image src={'/iphone.png'} alt='Instagram logo viviana sales funel' width={180} height={380}/>
                    <div className={styles.socialText}>
                        <h3>Connect your E-Web and E-Store to track everything.</h3>
                        <p className='none'>
                        Get metrics on your calls to action, understand the interests of your visitors, and analyze what they are looking for.
                        </p>
                    </div>
                    
                </div>
               </div>
               <div className={styles.mid}></div>
               <div className={styles.right}>
                    <h3>Complete analysis of you marketing campaigns...</h3>
                    <ol>
                    <li>1. Set objectives.</li>
                    <li>2. Learn where is your marketing failing.</li>
                    <li>3. Learn which prices your clients are expecting</li>
                    <li>4. Know the cost of acquiring your clients.</li>
                    <li>5. Understand why your visits are not making sales.</li>
                    <li>6. Understand your audience.</li>
                    <li>7. Get smart data on the preferences of your clients.</li>
                    <li>8. Conduct marketing tests.</li>
                    <li>9. Compare campaigns.</li>
                    <li>10. Receive intelligent analysis.</li>
                    <li>11. Book sessions with designers and marketers</li>
                    <li>12. and much more...</li>
                    </ol>
               </div>
                
            </div>
        </div>
    </div>
  )
}

export default VivianaCard
