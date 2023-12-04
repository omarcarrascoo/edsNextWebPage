import React from 'react'
import styles from './contactCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
function ContactCard() {
  return (
    <section className={styles.contactCard}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <Image src={"/world.svg"} alt='Contact Era digital Solution software development in toronto' fill/>
          </div>
          <div className={styles.textContainer}>
           <div className={styles.titles}>
           <h2>Distance is not a limitation, land your digital project.</h2>
            <p className='parr'>No matter where you are, we use different communication and administration tools that allow us to work with companies from anywhere in the world.</p>
            <h4>Follow our social media:</h4>
            <div className={styles.socialContainer}>
            <div className={styles.social}>
              <Link href={"/"}>
                <Image alt='instagram logo' width={60} height={60} src={"/instagram.png"}/>
              </Link>
            </div>
            <div className={styles.social}>
              <Link href={"/"}>
                <Image alt='facebook logo' width={60} height={60} src={"/facebook.png"}/>
              </Link>
            </div>
            <div className={styles.social}>
              <Link href={"/"}>
                <Image alt='linkedin logo' width={60} height={60} src={"/linkedin.png"}/>
              </Link>
            </div>
            </div>
           </div>
            <div className={styles.formContainer}>
              <p className="parr clasicBlue">Leave us your contact data and will contact you for a first interview</p>
              <form action="">
                <label htmlFor="name">Full Name</label>
                <input type="text" placeholder='Your name...' />
                <label htmlFor="email">Email</label>
                <input name='email' type="email" placeholder='example@gmail.com' />
                <label htmlFor="subject">Subject:</label>
                <input name="subject" type="text" placeholder='I want to develop my e-store...' />
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="10" placeholder="I have an awsome product that i want to start selling everywere and anytime"></textarea>
                <button className='cbtn'>Start Planning</button>
              </form>
            </div>
          </div>
        </div>
    </section>
  )
}

export default ContactCard
