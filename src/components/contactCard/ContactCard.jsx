import React from 'react'
import styles from './contactCard.module.css'
import Image from 'next/image'
function ContactCard() {
  return (
    <section className={styles.contactCard}>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src={"/rocketEra.svg"} alt='Era Digital Solutions Logo' width={500} height={500}/>
                <h2><span className="clasicBlue center">ERA |</span> DIGITAL SOLUTIONS</h2>
            </div>
            <p className='parr center'>Our mission is to help people land their projects into the digital era. We aim to be an ally providing business owners with a set of tools to navigate in this digital maze and secure their spot in the upcoming new era, where everything is moving online. </p>
            <form action="" className={styles.form}>
                <p className='clasicBlue parr center'>Leave us your name and email and will contact you for a first interview</p>
                <input type="text" placeholder='Your Name' />
                <input type="text" placeholder='Your Email'/>
                <input type="text" placeholder='Subject' />
                <textarea name="" id="" rows="8" placeholder='Your message...'></textarea>
                <button className={styles.btn}>Send Email</button>
            </form>
        </div>
    </section>
  )
}

export default ContactCard
