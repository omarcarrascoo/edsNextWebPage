import React from 'react'
import styles from './mainHero.module.css'
import Image from 'next/image'
function MainHero() {
  return (
    <section className={styles.mainHero}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1>WE <span className='clasicBlue'>LAND YOUR
                <br /> BUSINESS</span> INTO <br/> THE <span className="clasicBlue">DIGITAL</span> ERA</h1>
                <p className="bigParr">Your customers are online, your competitors are online, and the opportunities are online. 
                What are you waiting for?</p>
                <button className='cbtn'>Start Planning</button>
            </div>
            <div className={styles.imageContainer}>
                <Image src={"/world.svg"} alt='Era Digital Solution world' fill/>
            </div>
        </div>
    </section>
  )
}

export default MainHero
