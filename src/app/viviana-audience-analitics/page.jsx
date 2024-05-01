import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'
import MainFooter from '@/components/mainFooter/mainFooter'
import styles from './viviana.module.css'

export const metadata = {
    title: 'ERA DIGITAL SOLUTIONS',
    description: ' Era Digital Solutions transforms Ideas into Digital Innovations.Specializing in bespoke software, web and mobile development with a focus in audience analytics and data-driven insights, we land your business into the digital era.',
  }
function Page() {
  return (
    <>
        <MainHeader/>
        <main>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.text}>
                        <h1>VIVIANA</h1>
                        <p className='parr'>
                            Be among the first to experience the power of Viviana! We&apos;re inviting early adopters to join our beta program for this revolutionary tool. Viviana is an all-encompassing audience analytics solution that seamlessly integrates with social media platforms, websites, online stores, and business applications. With Viviana at your fingertips, you&apos;ll gain invaluable insights into marketing performance and user behavior with your products. Uncover hidden opportunities within your digital strategies and receive clear metrics pinpointing areas where your business may be falling short in the digital landscape. Don&apos;t miss this opportunity to stay ahead of the curve with Viviana.
                        </p>
                    </div>
                    <div className={styles.text}>
                        <h2>JOIN THE BETA</h2>
                        <form className={styles.form} action="">
                                <p className='parr'><span className='clasicBlue'>Leave us your contact data and will contact you for a first interview</span></p>
                                <input type="text" name="name" id="name" placeholder='Your Name' />
                                <input type="email" name="email" id="email" placeholder='Your Email' />
                                <br />
                                <button className='cbtn'>Send Email</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
        <MainFooter/>
    </>
  )
}

export default Page
