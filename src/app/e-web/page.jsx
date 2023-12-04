import ContactCard from '@/components/contactCard/ContactCard'
import EWebDisign from '@/components/eWebDisign/EWebDisign'
import EWebHero from '@/components/eWebHero/EWebHero'
import EWebIncludes from '@/components/eWebIncludes/EWebIncludes'
import EWebMetrics from '@/components/eWebMetrics/EWebMetrics'
import EWebPanel from '@/components/eWebPanel/EWebPanel'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'

function page() {
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

export default page
