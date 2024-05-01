import React from 'react'
import styles from './aboutWork.module.css'
import Image from 'next/image'
import Link from 'next/link'
function AboutWork() {
  return (
    <section className={styles.aboutWork}>
        <h2><span className="clasicBlue">Our</span> work process</h2>
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <Image src={"/checked.svg"} alt='Era digital solution requirement and analisis' fill/>
                </div>
                <h3>Requirements analysis</h3>
                <p className="parr">During this stage, an analysis of each client&apos;s requirements is conducted to determine the features to be developed for the project, specifying everything it needs to do and have to achieve its maximum functionality.</p>
            </div>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <Image src={"/design.svg"} alt='Era digital solution design and architecture' fill/>
                </div>
                <h3>Design and Architecture</h3>
                <p className="parr">This stage of work aims to define the structure of the solution for the problem outlined in the requirements analysis. We create the wireframe for the software to be developed. During this stage, the internal structure of each project is also defined.</p>
            </div>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <Image src={"/brackets.svg"} alt='software developing brackets era digital solutions' fill/>
                </div>
                <h3>Implementation</h3>
                <p className="parr">In the implementation stage, we develop and test the software to ensure it is ready for launch. We involve our client in the decisions regarding the technology used, to ensure our clients understand the reach of the project and what would be the nexts steps.</p>
            </div>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <Image src={"/final.svg"} alt='Final Digital Product of era digital solutions' fill/>
                </div>
                <h3>Final Product</h3>
                <p className="parr">This is the final stage of every project, which involves delivering all the components developed in the project with their respective tests. At this stage, the project will be ready to go live.</p>
            </div>
        </div>
        <Link className='underlink' href={"/contact-us"}>Book a meating</Link>
    </section>
  )
}

export default AboutWork
