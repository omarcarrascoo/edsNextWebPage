import React from 'react'
import styles from './eWebPanel.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EWebPanel() {
  return (
    <section className={styles.eWebPanel}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/panel.png"} alt='ERA DIGTIAL SOLUTIONS PANEL TO UPDATE YOUR WEBSITE' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2>A WEB PAGE THAT IS <span className="clasicBlue">EASY TO UPDATE</span></h2>
                <p className='parr'>Keep everything organize, the best panel to manage your web site and upload new content in the easiest and quickest way, <span className="clasicBlue">deploy new information to your clients in seconds.</span></p>
                <Link href={"/"} className='cbtn'>Build your page with profesionals</Link>
            </div>
        </div>
    </section>
  )
}

export default EWebPanel
