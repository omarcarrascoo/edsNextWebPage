import React from 'react'
import styles from './aboutFrases.module.css'
function AboutFrases() {
  return (
    <section className={styles.aboutFrases}>
      <div className={styles.container}>
        <p ><span className="clasicBlue">We are</span> not in an era of changes, but in a <span className="clasicBlue">change</span> of era characterized by the digitization of everything around us.</p>
        <h2 className='parr'>We are a <span className="clasicBlue">software development and web design studio based in Toronto and Mexico City</span> that  want to help business owners grow and secure their spot in the digital era by providing a build-to-suit package of tools for any kind of business.</h2>
      </div>
    </section>
  )
}

export default AboutFrases
