import ContactCard from '@/components/contactCard/ContactCard'
import EWebDisign from '@/components/eWebDisign/EWebDisign'
import EWebHero from '@/components/eWebHero/EWebHero'
import EWebIncludes from '@/components/eWebIncludes/EWebIncludes'
import EWebMetrics from '@/components/eWebMetrics/EWebMetrics'
import EWebPanel from '@/components/eWebPanel/EWebPanel'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'


export const metadata = {
  title: 'E-WEB | ERA DIGITAL SOLUTIONS',
  description: 'We develop websites that tracks user interactions and combines artificial intelligence to enhance the user journey. Gain insights into where your page lacks engagement and discover opportunities to improve user interactivity.',
  keywords: 'Personalized Web Pages, E-Web, Landing Page Optimization, Web Page Metrics Analysis, User Experience Analysis, E-Web for Improved Conversion, Fast Loading Web Pages, Page Development Services, Web Page Design, Web Page Development with AI, Landing Page Design, User Experience Enhancement, User Interface Optimization'
}

function Page() {
  return (
    <>
        <MainHeader/>
        <EWebHero/>
        <EWebMetrics/>
        <EWebPanel/>
        <EWebIncludes/>
        <EWebDisign/>
        <ContactCard/>
    </>
  )
}

export default Page
