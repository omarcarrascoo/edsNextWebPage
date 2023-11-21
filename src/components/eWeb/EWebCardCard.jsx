import React from 'react'
import styles from './eWeb.module.css'
import Image from 'next/image'
function EWebCard() {
  return (
    <section className={styles.eWebCard}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>WE DON'T DEVELOP WEB PAGES</h2>
          <p className={styles.subtitle}>We create E-web a powerful marketing tool!</p>
          <p className='parr'>With an E-page, <span className="clasicBlue">gain insights into your visitors, understand your audience, and get a sense of what they expect.</span> Track your visits and calls to action, and identify areas where your page may be falling short.</p>
          <button className="cbtn">
            Start Planning
          </button>
        </div>
        <div className={styles.imgContainer}>
          <Image src={"/e-webComputer.png"} alt='E Web proyect mac book air mockup era digital' width={1200} height={800}/>
        </div>
      </div>
    </section>
  )
}

export default EWebCard
