import ContactCard from '@/components/contactCard/ContactCard'
import EStoreFinacial from '@/components/eStoreFinacial/EStoreFinacial'
import EStoreHero from '@/components/eStoreHero/EStoreHero'
import EStoreProductMetrics from '@/components/eStoreProductMetrics/EStoreProductMetrics'
import EStoreReasons from '@/components/eStoreReasons/EStoreReasons'
import EStoreSkull from '@/components/eStoreSkull/EStoreSkull'
import EStoreStripe from '@/components/eStoreStripe/EStoreStripe'
import EStoreTruck from '@/components/eStoreTruck/EStoreTruck'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'

function page() {
  return (
    <>
        <MainHeader/>
        <main>
            <EStoreHero/>
            <EStoreSkull/>
            <EStoreProductMetrics/>
            <EStoreTruck/>
            <EStoreFinacial/>
            <EStoreStripe/>
            <EStoreReasons/>
            <ContactCard/>
        </main>
    </>
  )
}

export default page
