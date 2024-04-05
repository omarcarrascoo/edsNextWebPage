import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'
import styles from './e-start.module.css'
import Image from 'next/image'
import MainFooter from '@/components/mainFooter/mainFooter'

export const metadata = {
    title: 'FInicing for digital projects. | ERA DIGITAL SOLUTIONS',
    description: "Finance your creative ventures with us and secure your place in the digital landscape. From crafting a tailored digital strategy to bringing your ideas to life, we're here for every step. As professional digital creators, we ensure no one gets left behind in this digital era",
    keywords: 'App Development Financing, Start Digital Project Funding, Help Starting Digital Projects, Financing for Entrepreneurs, Risk Investors for Tech Projects, Digital Development Financing, Digital Strategy Consultancy, App Development Solutions, E-Commerce Financing, E-Store Development Funding, E-Web Project Financing, E-App Funding Assistance, Technology Project Investment, Tech Startup Funding Options, Digital Venture Capital, App Development Consultancy, E-Commerce Strategy Services, Digital Transformation Financing, Technology Investment Opportunities, Tech Project Advisory Services'
  }
  
function Page() {
  return (
    <>
        <MainHeader/>
        <main>
            <section className={styles.Hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.imgContainer}>
                        <Image src={"/moneyhand.svg"} fill alt='Finicing for digital projects'/>
                    </div>
                    <div className={styles.textContainer}>
                        <div>
                            <h2><span className="clasicBlue">E-</span>Start</h2>
                            <p className="parr">
                                Feeling overwhelmed with where to begin in the digital realm? Let us be your compass. From conceptualization to realization, we craft a tailored blueprint for your journey. Harness the power of our innovative thinking and passion for development to propel your business to new heights in this digital era.
                            </p>
                        </div>
                        <div>
                            <h1><span className="clasicBlue">Need Financing </span>to Fuel Your Digital Transformation?</h1>
                            <p className="parr">
                                Rest assured, we've got your back. In this era of rapid change, we refuse to leave anyone behind. Our mission is to stand shoulder-to-shoulder with business owners, ensuring they secure their place in the digital realm and navigate through this era of transformation.
                            </p>
                        </div>
                        <div>
                            <form className={styles.form} action="">
                                <p className='parr'><span className='clasicBlue'>Leave us your contact data and will contact you for a first interview</span></p>
                                <input type="text" name="name" id="name" placeholder='Your Name' />
                                <input type="email" name="email" id="email" placeholder='Your Email' />
                                <br />
                                <button className='cbtn'>Send Email</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section> 
        </main>
        <MainFooter></MainFooter>
    </>
  )
}

export default Page
