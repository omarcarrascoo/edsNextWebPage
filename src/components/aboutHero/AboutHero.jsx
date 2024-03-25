import React from 'react'
import styles from './aboutHero.module.css'
import Link from 'next/link'

function AboutHero() {
  return (
    <section className={styles.aboutHero}>
        <div className={styles.container}>
            <h1> We help you <span className="clasicBlue">landing your ideas</span> into the digital era</h1>
            <p className='parr'>We aim to be an ally providing business owners with a set of tools to navigate in this digital maze and secure their spot in the upcoming new era, where everything is moving digital. </p>
            <Link className='cbtn' href={"/"}>Start Planning</Link>
        </div>
    </section>
  )
}

export default AboutHero
