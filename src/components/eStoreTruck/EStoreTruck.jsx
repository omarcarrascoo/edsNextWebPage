import React from 'react'
import styles from './eStoreTruck.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EStoreTruck() {
  return (
    <section className={styles.eStoreTruck}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2>ORGANIZE AND <span className="clasicBlue">AUTOMATIZE YOUR SHIPMENT</span> LOGISTIC</h2>
                <p className='parr'>We automatize your order, we use agile methodologies to help store owner organize their shipments, we have created a specialize tool call E-planer where you can track the status of your orders, see where are your bottle necks and have the best costumer relationship</p>
                <Link href="/"className='underlink'>Automate your process</Link>
            </div>
            <div className={styles.imgContainer}>
                <Image src={"/truck.svg"} alt='Automatize you shipment whith era digital solutions' fill/>
            </div>
        </div>
    </section>
  )
}

export default EStoreTruck
