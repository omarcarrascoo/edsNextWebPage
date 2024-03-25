"use client"
import React, { useState } from 'react'
import styles from './mainHeader.module.css'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'
function MainHeader() {

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileNavOpen2, setIsMobileNavOpen2] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  const toggleMobileNav2 = () => {

    setIsMobileNavOpen2(!isMobileNavOpen2);
  };


  return (
    <header className={styles.mainHeader}>
        <div className={styles.container}>
            <p><span className={styles.blue}>ERA |</span> DIGITAL SOLUTIONS</p>
            <nav className={styles.mainNav}>
                <ul className={styles.mainUl}>
                    <li><Link href={"/"}>Home</Link></li>
                    <li className={styles.productLi}><Link  href={'/e-store'}>Products</Link>
                     <ul className={styles.serviceNav}>
                        <li><Link href={"/e-store"}>E-STORE</Link></li>
                        <li><Link href={"/e-web"}>E-WEB</Link></li>
                        <li><Link href={"/bespoke-mobile-application-development"}>App Development</Link></li>
                        <li><Link href={"/build-to-suit-software"}>Build to Suit</Link></li>
                        <li><Link href={"/viviana-digital-analisis"}>Viviana</Link></li>
                     </ul>
                    </li>
                    <li><Link href={"/about-us"}>About Us</Link></li>
                    <li><Link href={"/blog"}>Blog</Link></li>
                    <li><Link href={"/contact-us"}>Contact</Link></li>
                    {/* <li className='clascicBlue'><Link href={"/login"}>Login</Link></li> */}
                    <AuthLinks/>

                </ul>
            </nav>
            <div className={styles.hamb} onClick={toggleMobileNav}>
              {/* <p>Menu</p> */}
              <div className=""></div>
              <div className=""></div>
              <div className=""></div>
            </div>
        </div>
        <nav className={`${styles.mobileNav} ${isMobileNavOpen===true ? styles.open : ''}`}>
                <ul className={styles.mainUl}>
                    <li><Link href={"/"}>Home</Link></li>
                    <li className={styles.productLi} onClick={toggleMobileNav2}>Products 
                     <ul className={`${styles.serviceNavMobile} ${isMobileNavOpen2===true ? styles.open : ''}`} >
                        <li><Link href={"/e-store"}>@ E-STORE</Link></li>
                        <li><Link href={"/e-web"}>@ E-WEB</Link></li>
                        <li><Link href={"/bespoke-mobile-application-development"}>@ App Development</Link></li>
                        <li><Link href={"/build-to-suit-software"}>@ Build to Suit</Link></li>
                        <li><Link href={"/viviana-digital-analisis"}>@ Viviana</Link></li>
                     </ul>
                    </li>
                    <li><Link href={"/about-us"}>About Us</Link></li>
                    <li>Blog</li>
                    <li><Link href={"/contact-us"}>Contact</Link></li>
                    <li className='clascicBlue'><Link href={"/login"}>Login</Link></li>

                </ul>
            </nav>
    </header>
  )
}

export default MainHeader
