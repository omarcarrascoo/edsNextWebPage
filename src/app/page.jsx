import MainHeader from "@/components/mainHeader/MainHeader";
import styles from "./homepage.module.css";
// import MainHero from "@/components/mainHero/mainHero";
import EstoreCard from "@/components/eStoreCard/EstoreCard";
import VivianaCard from "@/components/vivianaCard/VivianaCard";
import EPlannerCard from "@/components/ePlannerCard/EPlannerCard";
import EPrintCard from "@/components/ePrintCard/EPrintCard";
import EWebCard from "@/components/eWebCard/EWebCardCard";
import CrabCard from "@/components/crabCard/CrabCard";
import ContactCard from "@/components/contactCard/ContactCard";
import MainFooter from "@/components/mainFooter/mainFooter";
import MainHero from "@/components/mainHero/MainHero";

export default function Home() {
  return <>
    <MainHeader/>
    <div className={'space50'}></div>
    <MainHero/>
    <div className={styles.container1}>
      <div className={styles.frase1}>
      <p>&quot;We have created a pack of tools that is everything small business need to <span className="clasicBlue">start conquering the digital era.&quot;</span></p>

      </div>
      <EstoreCard/>
      <div className={styles.spcae2}>
        <VivianaCard/>
      </div>
      <EPlannerCard/>
      <EPrintCard/>
      <EWebCard/>
      <CrabCard/>
    </div>
    <ContactCard/>
    <MainFooter/>
  </>;
}
