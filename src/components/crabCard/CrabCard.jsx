import React from 'react'
import styles from './crabCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
function CrabCard() {
  return (
    <section className={styles.crabCard}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h3>Become an early adopter</h3>
                <p className='parr'>We are changing the way businesses interpret their data with the Crab system. Our mission is to provide micro and small businesses with a new way to interpret their data, making professional analysis comprehensible. We analyze everything: operation, expenses, costs, your team, your productivity, marketing, and your social media. Get to know where your business is faltering and make decisions based on information.</p>
                <Link href={"/viviana-audience-analitics"} className={styles.btn}>Get early access</Link>
            </div>
            <div className="right">
            <div className={styles.imageContainer}>
                <Image src={"/logoCrabSystem.svg"} fill alt='Logo Crab System'/>
            </div>
            
            </div>

        </div>
    </section>
  )
}

export default CrabCard
