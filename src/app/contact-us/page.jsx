import ContactCard from '@/components/contactCard/ContactCard'
import MainFooter from '@/components/mainFooter/mainFooter'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'
import styles from './contactUs.module.css'
function page() {
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

export default page
