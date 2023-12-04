import Image from 'next/image'
import React from 'react'
import styles from "./eWebIncludes.module.css"
function EWebIncludes() {
  return (
    <section className={styles.eWebIncludes}>
        <div className={styles.container}>
            <h2>WHAT DOES AL OUR <span className="clasicBlue">E-WEBS INCLUDE</span>?</h2>
            <div className={styles.includesContainer}>
                <div className={styles.include}>
                    <div className={styles.icon}>
                        <Image src={"/cloud.svg"} alt='Era digital solutions cloud provider' fill/>
                    </div>
                    <h3>Hosting, domain & ssl</h3>
                    <p className="parr">We help you register your domain: .com, .ca, .com.ca .com.mx, .shop, .tienda, .tech .io..., also we host your site and set the ssl certificate, so your site has always an encrypted communication with your clients.</p>
                </div>
                <div className={styles.include}>
                    <div className={styles.icon}>
                        <Image src={"/phone.svg"} alt='Era digital solutions respondive web page disign' fill/>
                    </div>
                    <h3>Responsive Designs</h3>
                    <p className="parr">A responsive design enable your users view your page in any kind of device. We ensure that you page looks awesome in every part so you can give the best experience for your users.</p>
                </div>
                <div className={styles.include}>
                    <div className={styles.icon}>
                        <Image src={"/map.svg"} alt='Era digital solutions google maps registration' fill/>
                    </div>
                    <h3>Google Buisnes y maps</h3>
                    <p className="parr">We take care of registering your business on Google Business and Google Maps so that your business becomes visible everywhere, anywhere and anytime</p>
                </div>
                <div className={styles.include}>
                    <div className={styles.icon}>
                        <Image src={"/mail.svg"} alt='Era digital solutions profesional email provider' fill/>
                    </div>
                    <h3>Profesional Email</h3>
                    <p className="parr">We provide you with profesional emails, so you can give formality and credibility to your business
                    </p>
                    <p className={`${styles.mobile} parr`}>Example: <span className="clasicBlue">contact@eradigitalsolution.com</span></p>
                </div>
                <div className={styles.include}>
                    <div className={styles.icon}>
                        <Image src={"/pen.svg"} alt='Era digital solutions intuitive designs' fill/>
                    </div>
                    <h3>Intuitive design</h3>
                    <p className="parr">We help you register your domain: .com, .ca, .com.ca .com.mx, .shop, .tienda, .tech .io..., also we host your site and set the ssl certificate, so your site has always an encrypted communication with your clients.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EWebIncludes
