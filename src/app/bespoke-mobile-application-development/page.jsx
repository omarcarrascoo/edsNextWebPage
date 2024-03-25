import AppDevelopmentHero from "@/components/appDevelopmentHero/appDevelopmentHero"
import AppDevelopmentIdea from "@/components/appDevelopmentIdea/appDevelopmentIdea"
import AppDevelopmentNotifications from "@/components/appDevelopmentNotifications/appDevelopmentNotifitcations"
import MainHeader from "@/components/mainHeader/MainHeader"

function Page(){
    return(
        <>
            <MainHeader/>
            <main>
                <AppDevelopmentHero/>
                <AppDevelopmentIdea/>
                <AppDevelopmentNotifications/>
            </main>
        </>
    )
}
export default Page