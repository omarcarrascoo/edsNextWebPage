import React from 'react'
import styles from './blogpost.module.css'
import MainHeader from '@/components/mainHeader/MainHeader'
import Image from 'next/image'
import MainFooter from '@/components/mainFooter/mainFooter'
import ContactCard from '@/components/contactCard/ContactCard'
function Page() {
  return (
    <>
        <MainHeader/>
        <main className={styles.blogPost}>
            <div className={styles.container}>
                <div className={styles.titles}>
                <h1>TITLE OF THE ARTICLE</h1>
                <h2>SUBTITLE THAT HAS ALSO KEY WORDS</h2>
                <p className='clasicBlue'>OMAR CARRASCO  22-12-2023</p>
                </div>
                <div className={styles.imgContainer}>
                    <Image src={"/blogtest.png"} alt='Digital and buisnes blog for this era' fill/>
                </div>
                <h3>“We are not in an era of changes, but in a change of era characterized by the digitization of everything around us.”</h3>
                <p>We are a software development and web design studio based in Toronto and Mexico City that  want to help business owners grow and secure their spot in the digital era by providing a build-to-suit package of tools for any kind of business.</p>
                <p>Lorem ipsum dolor sit amet consectetur. In facilisis purus ultricies cum nullam molestie integer. Viverra dictum tortor risus in purus amet. Semper vulputate nullam eu proin ipsum urna platea turpis justo. Dis est scelerisque donec nunc neque sed habitasse ipsum. Ut commodo sit elit ultricies sit porta faucibus et blandit. Eget mus sodales morbi metus. Integer lorem nisl nam magnis nunc. Pellentesque id risus et cum auctor. Posuere velit amet blandit urna. Praesent non tellus aliquam lacus nunc quis nisl tempor. Mauris nibh gravida condimentum bibendum habitant aenean sem mus. Eget nec ultrices vulputate mi sit ac ullamcorper non. Elit est nibh amet varius purus. Amet urna enim semper sed massa.</p>
                <p>ullamcorper non. Elit est nibh amet varius purus. Amet urna enim semper sed massa.
                Elementum vehicula viverra nunc urna. Sed dictum viverra massa volutpat. Placerat venenatis at in cras nibh mattis placerat tincidunt. Platea eu donec risus leo malesuada. Eget pretium ullamcorper est viverra non at. Sapien habitasse aliquet lacus tempor in blandit at platea. Adipiscing viverra dui elementum pharetra urna. Gravida eu sit diam pretium habitant gravida quis dictum. Vitae elit vitae proin purus luctus suspendisse odio et. Aliquam ornare tincidunt sed ipsum nunc augue nisi. Egestas est luctus justo vitae magna.</p>
                <h3>Imperdiet malesuada</h3>
                <p>adipiscing etiam id varius eget semper. Nisl turpis etiam sit eleifend magna maecenas a et. Nulla pellentesque metus urna donec vestibulum et sit. Imperdiet nulla nulla quis id velit. Lobortis nec in habitant ultricies facilisis et faucibus arcu. At pharetra sit malesuada vulputate nulla id ultrices. Facilisi mi pellentesque maecenas sed dignissim viverra risus ut.</p>
                <p>Vitae pulvinar volutpat et tincidunt amet cras quam at diam. Maecenas urna ornare proin orci egestas amet elementum in sed. Quam tellus commodo leo cras ac enim. Non sed egestas sagittis hendrerit viverra. Nisi enim donec ullamcorper nunc in turpis vitae. In vel rhoncus lorem pellentesque ac. Faucibus placerat adipiscing tincidunt tortor volutpat. Nec ullamcorper ut ultrices purus felis non. Amet risus neque nullam mi feugiat hac integer. Scelerisque viverra adipiscing cursus pretium cras purus.</p>
                <p>Urna aliquam congue sagittis viverra nibh convallis in. Et aliquam risus sit ornare eget ultricies augue. Venenatis mattis cursus vel in scelerisque aliquet fermentum. Ut convallis egestas orci placerat gravida. Id euismod sit posuere arcu euismod massa consectetur sed. Scelerisque tortor mollis egestas morbi justo elementum vestibulum magna mauris. Faucibus platea adipiscing ut non magna. Sagittis pulvinar ac diam turpis tristique pharetra elementum sapien. Eget ut quis sed sapien. A quam fusce pellentesque massa magna enim dui. Malesuada et tristique vel consectetur non. Vitae aliquam nullam pellentesque condimentum auctor vel.</p>
            </div>
        </main>
        <ContactCard/>
        <MainFooter/>
    </>
  )
}

export default Page
