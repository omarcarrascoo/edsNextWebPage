import ContactCard from '@/components/contactCard/ContactCard'
import MainFooter from '@/components/mainFooter/mainFooter'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'
import styles from './contactUs.module.css'

export const metadata = {
  title: 'CONTACT US | ERA DIGITAL SOLUTIONS',
  description: 'Connect with Era Digital Solution, your premier software development company. Reach out to our professional team of programmers to discuss your digital project needs. Let us be your ally in navigating the digital landscape with tailored strategies. Contact us now for accessible data analysis tools and expert guidance.',
  keywords: 'Era Digital Solutions, Era, Digital, Solutions, Software Development Company, Professional Software Development, Software, Application Development, E-Store, E-Commerce, E-Apps, Web Pages, Data Analysis, Contact Era Digital Solutions, Contact, Contact Era Digital Solution, Software Development Company Contact, Professional Programmers Contact, Digital Project Consultation, Tailored Digital Strategies, Data Analysis Tools Access, Expert Guidance for Businesses, Digital Solutions Consultation, Software Development Inquiries, Digital Project Discussions' 
}

function Page() {
  return (
    <>
        <MainHeader/>
        <main className={styles.container}>
            <ContactCard/>
        </main>
        <MainFooter/>
    </>
  )
}

export default Page
