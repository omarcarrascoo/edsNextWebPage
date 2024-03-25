import React from 'react'
import styles from './appDevelopmentNotifications.module.css'
import Link from 'next/link'
import Image from 'next/image'
function AppDevelopmentNotifications() {
  return (
    <section className={styles.eStoreFinicial}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2><span className="clasicBlue">Unlock the power</span> of notifications</h2>
                <p className="parr">In a crowded digital world, notifications stand tall as the reminder that your brand matters. With a simple ping, they reignite connections and keep your brand alive in the hearts and minds of your clients.</p>
                <Link className='underlink' href={"/"}>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
                <Image src={"/notifications.png"} alt='Era digital solutions the power of notificatios for your clients' fill/>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentNotifications
