import AboutWork from "@/components/aboutWork/AboutWork"
import AppDevelopmentBooking from "@/components/appDevelopmentBooking/AppDevelopmentBooking"
import AppDevelopmentBouth from "@/components/appDevelopmentBouth/appDevelopmentBouth"
import AppDevelopmentHero from "@/components/appDevelopmentHero/appDevelopmentHero"
import AppDevelopmentIdea from "@/components/appDevelopmentIdea/appDevelopmentIdea"
import AppDevelopmentNotifications from "@/components/appDevelopmentNotifications/appDevelopmentNotifitcations"
import AppDevelopmentReview from "@/components/appDevelopmentReview/AppDevelopmentReview"
import AppDevelopmentRewards from "@/components/appDevelopmentRewards/appDevelopmentRewars"
import AppDevelopmentUx from "@/components/appDevelopmentUx/AppDevelopmentUx"
import ContactCard from "@/components/contactCard/ContactCard"
import MainFooter from "@/components/mainFooter/mainFooter"
import MainHeader from "@/components/mainHeader/MainHeader"
import Head from "next/head"

export const metadata = {
    title: 'APP DEVELOPMENT | ERA DIGITAL SOLUTIONS',
    description: ' Era Digital Solutions specializes in bespoke iOS and Android app development for businesses seeking enhanced client engagement and internal organizational efficiency. Our services encompass reward,, shopping, booking, delivery, real estate, club, behavior tracking applications, and more. Let us bring your app ideas to life.',
    keywords: 'Mobile App Development, Custom App Development, iOS App Development, Android App Development, Business App Development, Client Engagement Apps, Reward App Development, Behavior Tracking App, Shopping App Development, Booking App Development, Delivery App Development, Real Estate App Development, Club App Development, Application Development Services, Bespoke App Development, App Development, iOS Development, Android Development, Build to Suit App Development, Reward Application Development, Real Estate Application Development, Club Application Development, Delivery Application Development, Booking Application Development, Era Digital Solutions, Era, Era Digital, Digital Solutions, Era Solutions'
}

function Page(){
    return(
        <>
            <MainHeader/>
            <main>
                <AppDevelopmentHero/>
                <AppDevelopmentIdea/>
                <AppDevelopmentNotifications/>
                <AppDevelopmentBooking/>
                <AppDevelopmentUx/>
                <AppDevelopmentRewards/>
                <AppDevelopmentBouth/>
                <AppDevelopmentReview/>
                <AboutWork/>
                <ContactCard/>
                <MainFooter/>
            </main>
        </>
    )
}
export default Page