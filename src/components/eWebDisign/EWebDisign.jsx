import React from 'react'
import styles from './eWebDisign.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EWebDisign() {
  return (
    <section className={styles.eWebPanel}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/figma.png"} alt='ERA DIGTIAL SOLUTIONS PANEL TO UPDATE YOUR WEBSITE' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2>Your business is unique your site should be as-well</h2>
                <p className='parr'>All our design are 100% unique and tailored to your business, we involve our clients in every part of the design process so it reflects the real vision of the brand.</p>
                <Link href={"/"} className='cbtn'>Start Creating</Link>
            </div>
        </div>
    </section>
  )
}

export default EWebDisign
