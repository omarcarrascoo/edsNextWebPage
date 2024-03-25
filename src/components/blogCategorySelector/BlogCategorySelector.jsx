import React from 'react'
import styles from './blogCategorySelector.module.css'
import Link from 'next/link'



const BlogCategorySelector = async () => {
  const getData = async () =>{
    const res = await fetch("http:/localhost:3000/api/categories",{cache: "no-store"})
    if(!res.ok){
      throw new Error("Failed");
    }
    return res.json()
  }
  const data = await getData()
  return (
    <div className={styles.container}>
        {data?.map((item)=>(
          <Link key={item._id} href={item.slug} className={styles.btnCategory}>{item.title}</Link>
        ))}
    </div>
  )
}

export default BlogCategorySelector;
