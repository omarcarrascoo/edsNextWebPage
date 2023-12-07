import BlogCategorySelector from '@/components/blogCategorySelector/BlogCategorySelector'
import MainFooter from '@/components/mainFooter/mainFooter'
import MainHeader from '@/components/mainHeader/MainHeader'
import React from 'react'
import styles from './blogPage.module.css'
import BlogPostCard from '@/components/blogPostCard/BlogPostCard'
function page() {
  return (
    <>
        <MainHeader/>
        <main>
           <div className={styles.container}>
                <h1>DIGITAL ERA BLOG</h1>
                <p className='parr'p>Get the hot news about the tech world, read article of how to improve your business, get marketing techniques, be updates with the best buisnes practices, read about big business histories and much more topics... </p>
            </div>
            <BlogCategorySelector/> 
            <div className={styles.postsContainer}>
              <BlogPostCard/>
              <BlogPostCard/>
              <BlogPostCard/>
              <BlogPostCard/>
              <BlogPostCard/>
              <BlogPostCard/>
              <BlogPostCard/>
              <BlogPostCard/>
            </div>
        </main>
        <MainFooter/>
    </>
  )
}

export default page
