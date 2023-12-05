import React from 'react'
import styles from './mainHeader.module.css'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'
function MainHeader() {
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
                        <li><Link href={"/e-store"}>App Development</Link></li>
                        <li><Link href={"/e-store"}>Build to Suit</Link></li>
                     </ul>
                    </li>
                    <li><Link href={"/about-us"}>About Us</Link></li>
                    <li>Blog</li>
                    <li><Link href={"/contact-us"}>Contact</Link></li>
                    {/* <li className='clascicBlue'><Link href={"/login"}>Login</Link></li> */}
                    <AuthLinks/>

                </ul>
            </nav>
            <div className={styles.hamb}>
              {/* <p>Menu</p> */}
              <div className=""></div>
              <div className=""></div>
              <div className=""></div>
            </div>
        </div>
        <nav className={styles.mobileNav}>
                <ul className={styles.mainUl}>
                    <li><Link href={"/"}>Home</Link></li>
                    <li className={styles.productLi}><Link  href={'/e-store'}>Products</Link>
                     <ul className={styles.serviceNav}>
                        <li><Link href={"/e-store"}>E-STORE</Link></li>
                        <li><Link href={"/e-web"}>E-WEB</Link></li>
                        <li><Link href={"/e-store"}>App Development</Link></li>
                        <li><Link href={"/e-store"}>Build to Suit</Link></li>
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
