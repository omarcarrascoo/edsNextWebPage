import React from 'react'
import styles from './blogPostCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
function BlogPostCard() {
  return (
    <div className={styles.card}>
        <div className={styles.imgContainer}>
            <Image src={"/blogPost.png"} alt='Era digital Solutions Blog article about tech and buisness' width={350} height={200}/>
        </div>
        <div className={styles.container}>
            <h2>Title of the post</h2>
            <span className="clasicBlue">5 mins read</span>
            <p className='parr'>Lorem ipsum dolor sit amet consectetur. Cursus aliquet viverra id diam morbi nullam. Faucibus amet in aliquet ac. A vivamus aliquet tempus convallis eget dui facilisi.</p>
            <Link href={"/"} className='underlink'>Read More</Link>
        </div>
    </div>
  )
}

export default BlogPostCard
