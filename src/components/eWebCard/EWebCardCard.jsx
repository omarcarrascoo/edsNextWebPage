import React from 'react'
import styles from './eWeb.module.css'
import Image from 'next/image'
function EWebCard() {
  return (
    <section className={styles.eWebCard}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>WE DON&apos;T DEVELOP WEB PAGES</h2>
          <p className={styles.subtitle}>We create <span className="clasicBlue">E-web</span> a powerful marketing tool!</p>
          <p className={`parr ${styles.parrEweb}`}>With an E-page, <span className="none">gain insights into your visitors, understand your audience, and get a sense of what they expect.</span> Track your visits and calls to action, and identify areas where your page may be falling short.</p>
          <div className={styles.btnContainer}>
          <button className={`cbtn ${styles.btnEWeb}`}>
            Start Planning
          </button>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <Image src={"/e-webComputer.png"} alt='E Web proyect mac book air mockup era digital' fill/>
        </div>
      </div>
    </section>
  )
}

export default EWebCard
