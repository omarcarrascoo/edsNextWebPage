import React from 'react'
import styles from './eStoreSkull.module.css'
import Image from 'next/image'
import Link from 'next/link'
function EStoreSkull() {
  return (
    <section className={styles.eStoreSkull}>
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={"/skull.svg"} alt='Era Digital Solution E store a new way of selling' fill/>
            </div>
            <div className={styles.textContainer}>
                <h2><span className='clasicBlue'>E-Store</span> a new way of selling</h2>
                <p className='parr'>Small businesses don&apos;t have access to specialized analysis tools, but we are living in a world of data. <span className="clasicBlue">A conventional e-commerce is not enough in this new digital era,</span> where those who know how to read the data have an enormous advantage over others. We provide our customers with E-Store a first-world pack of tools so that no one stays behind in this shift. We are making analysis tools accessible for every business.</p>
                <Link href={"/contact-us"} className='cbtn'>Start Planning</Link>
            </div>
        </div>
    </section>
  )
}

export default EStoreSkull
