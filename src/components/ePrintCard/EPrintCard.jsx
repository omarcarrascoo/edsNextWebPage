import React from 'react'
import styles from './ePrintCard.module.css' 
import Image from 'next/image'
import Link from 'next/link'
function EPrintCard() {
  return (
    <section className={styles.ePrintCard}>
        <div className={styles.container}>
            <h2 className={styles.subTitle2}>WE CAN CREATE <span className="clasicBlue">SPECIALIZE TOOLS</span> FOR ALL THE INDUSTRIES </h2>
            <div className={styles.proyectContainer}>
                <div className={styles.card}>
                    <Image src="/industrylux_panel.png" width={450} height={250} alt='Proyect of era digital solutions'/>
                    <h3>REAL ESTATE SOFTWARE MANAGEMENT</h3>
                    <p>Organize your properties and brokers, set permissions, create landing pages for your properties in seconds, book meetings, manage your calendar, and complement it with our powerful sales tool, VIVIANA.</p>
                    <Link className='underlink' href={"/"}>Start my project</Link>
                </div>
                <div className={styles.card}>
                    <Image src="/sinapsis.png" width={450} height={250} alt='Proyect of era digital solutions'/>
                    <h3>SELL TICKETS AND PLAN YOUR EVENT</h3>
                    <p>Get a ticket sale system with only a 3% commission, efficiently manage your public relations team, gain financial insights, track your marketing campaigns, easily book venues, and manage your inventory.</p>
                    <Link className='underlink' href={"/"}>Start my project</Link>
                </div>
                <div className={styles.card}>
                    <Image src="/ivanapanel.png" width={450} height={250} alt='Proyect of era digital solutions'/>
                    <h3>GALLERY SOFTWARE MANAGEMENT</h3>
                    <p>Showcase your gallery collection, organize your artists, set up e-commerce for your gallery, sell tickets for your events, and manage your inventory, commissions, and expenses—all in one comprehensive software solution designed for galleries.</p>
                    <Link className='underlink' href={"/"}>Start my project</Link>
                </div>
                <div className={styles.card}>
                    <Image src="/marthapanel.png" width={450} height={250} alt='Proyect of era digital solutions'/>
                    <h3>SOFTWARE TAILORED FOR WRITERS</h3>
                    <p>OSoftware specialized for those who love writing. Publish your short posts, sell your books, cut commissions, engage with your audience through a newsletter, and connect it to our specialized marketing application, IVANA..</p>
                    <Link className='underlink' href={"/"}>Start my project</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EPrintCard
