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




export const metadata = {
  title: 'E-STORE | ERA DIGITAL SOLUTIONS',
  description: 'Maximize online sales with our e-store. Elevate your e-commerce with streamlined product metrics, user interactivity tracking, rewards, marketing engagement, financial insights, and seamless client attention. Trust pros to build your store. Start selling effortlessly.',
  keywords: 'E-store, E-commerce, Online Store, Sell Products Online, Professional Online Store Development, Software Development for Online Stores, Shipment Automation, Store Financial Insights, Product Insights, Fast Product Selling, User Experience, User Interface, Era Digital Solutions'
}


function Page() {
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

export default Page
