import AboutAgile from '@/components/aboutAgile/AboutAgile'
import AboutFrases from '@/components/aboutFrases/AboutFrases'
import AboutHero from '@/components/aboutHero/AboutHero'
import AboutUsCard from '@/components/aboutUsCard/aboutUsCard'
import AboutWork from '@/components/aboutWork/AboutWork'
import ContactCard from '@/components/contactCard/ContactCard'
import EPrintCard from '@/components/ePrintCard/EPrintCard'
import EStoreFinacial from '@/components/eStoreFinacial/EStoreFinacial'
import EWebMetrics from '@/components/eWebMetrics/EWebMetrics'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'

export const metadata = {
  title: 'ABOUT US | ERA DIGITAL SOLUTIONS',
  description: 'Era Digital Solution: Your trusted software development partner. We turn ideas into digital solutions, offering tailored strategies and accessible data analysis tools for businesses and entrepreneurs',
  keywords: 'Software Solutions Provider, Custom Software Development, Mobile App Development, Web Development Services, Enterprise Software Development, Software Architecture Expertise, Innovative Software Solutions, Digital Transformation Partner, Cutting-Edge Technology Solutions, Business Software Development, Software Engineering Excellence, Software Consultancy Services, Agile Software Development Approach, Full-Stack Development Capabilities, Industry-Leading Software Developers'
}

function Page() {
  return (
    <>
        <MainHeader/>
        <main>
            <AboutHero/>
            <AboutFrases/>
            <AboutUsCard/>
            <EStoreFinacial/>
            <EWebMetrics/>
            <AboutWork/>
            <EPrintCard/>
            <AboutAgile/>
            <ContactCard/>
            
        </main>
    </>
  )
}

export default Page
