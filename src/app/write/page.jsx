"use client"

import MainFooter from '@/components/mainFooter/mainFooter'
import MainHeader from '@/components/mainHeader/MainHeader'
import React, { useState } from 'react'
import styles from './write.module.css'
import Image from 'next/image'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.bubble.css"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function page() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const {data, status} = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>
  }
  if(status === "unauthenticated"){
    router.push("/")
  }
  return (
    <>
        <MainHeader/>
        <main className={styles.writeSection}>
            <div className={styles.container}>
              <input className={styles.input} type="text" placeholder='Title' />
              <div className={styles.editor}>
                <button className={styles.button} onClick={()=>setOpen(!open)}>
                  <Image src={"/add2.png"} alt='Menu button' width={16} height={16}/>
                </button>
                {open && (
                  <div className={styles.add}>
                    <button className={styles.addButton}>
                      <Image src={"/image.png"} alt='Menu button' width={16} height={16}/>
                    </button>
                    <button className={styles.addButton}>
                      <Image src={"/external.png"} alt='Menu button' width={16} height={16}/>
                    </button>
                    <button className={styles.addButton}>
                      <Image src={"/video.png"} alt='Menu button' width={16} height={16}/>
                    </button>
                  </div>
                ) }
                <ReactQuill className={styles.textArea} theme='bubble' value={value} onChange={setValue} placeholder='Write a post...'/>
                <button className={styles.publish}>Publish</button>
              </div>
            </div>
        </main>
        <MainFooter/>
    </>
  )
}

export default page
