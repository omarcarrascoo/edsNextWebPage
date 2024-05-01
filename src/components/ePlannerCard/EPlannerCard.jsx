import React from 'react'
import styles from './ePlannerCard.module.css'
import Link from 'next/link'
function EPlannerCard() {
  return (
    <section className={styles.ePlannerCard}>
        <div className={styles.container}>
            <h2 className={"subtitle1"}>TAKE CONTROL OF Y0UR BUSINESS WITH <br /><span className="clasicBlue">E-PLANNER</span></h2>
            <p className='parr center'>We help you organize your business by <span className="clasicBlue">automating tasks and processes for easy management</span>. Our clients benefit from NORMA, a toolkit based on the best agile practices, making any business more efficient.</p>
            <div className={styles.plannerGrid}>
                <div className={styles.card}>
                    <div className={styles.cardContainer}>
                    <p className={styles.cardTitle}>Task</p>
                        <p className={"parr"}>Take my business to another level. <br /> <br /></p>
                        <p className={styles.smallParr}>Automate and assign tasks to your team, organize your calendar, save time, and boost your efficiency...</p>
                    <p className={styles.number}>1</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardContainer}>
                    <p className={styles.cardTitle}>Doing</p>
                        <p className={"parr"}>Researching ways to track and grow my business. <br /><br /></p>
                        <p className={styles.smallParr}>Stay informed about your team&apos;s activities, identify bottlenecks, and enhance team connectivity.
                        </p>
                    <p className={styles.number}>2</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardContainer}>
                    <p className={styles.cardTitle}>Done</p>
                        <p className={"parr"}>Discover an ally to transition my business into the digital era.</p>
                        <p className={styles.smallParr}>Achieve your objectives and obtain clear performance indicators.</p>
                    <p className={styles.number}>3</p>
                    </div>
                </div>
            </div>
            <Link href={"/e-store"} className={`underlink ${styles.mt20}`}>Start Planning</Link>
        </div>
    </section>
  )
}

export default EPlannerCard
