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
  title: 'About Us | Era Digital Solutions',
  description: 'The best blog app!',
}

function page() {
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

export default page
