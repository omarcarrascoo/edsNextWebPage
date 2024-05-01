import React from 'react'
import styles from './appDevelopmentBooking.module.css'
import Link from 'next/link'
import Image from 'next/image'
function AppDevelopmentBooking() {
  return (
    <section className={styles.eStoreFinicial}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2>Get booked <span className="clasicBlue">Effortlessly</span></h2>
                <p className="parr">
                    Bringing convenience and efficiency to your appointment scheduling. With just one step, your clients can secure their spot ensuring a smooth booking experience. 
                </p>
                <p className='parr'>Say goodbye to the hassle of traditional booking methods and welcome a new era of seamless engagement.</p>
                <Link className='underlink' href={"/contact-us"}>Start Planning</Link>
            </div>
            <div className={styles.imgContainer}>
                <Image src={"/clubembers.png"} alt='Custom Booking Aplicacion Development Era Digital Solution' fill/>
            </div>
        </div>
    </section>
  )
}

export default AppDevelopmentBooking
