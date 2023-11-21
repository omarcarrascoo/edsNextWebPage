import MainHeader from "@/components/mainHeader/MainHeader";
import styles from "./homepage.module.css";
import MainHero from "@/components/mainHero/mainHero";
import EstoreCard from "@/components/eStoreCard/EstoreCard";
import VivianaCard from "@/components/vivianaCard/VivianaCard";
import EPlannerCard from "@/components/ePlannerCard/EPlannerCard";
import EPrintCard from "@/components/ePrintCard/EPrintCard";
import EWebCard from "@/components/eWeb/EWebCardCard";
import CrabCard from "@/components/crabCard/CrabCard";
import ContactCard from "@/components/contactCard/ContactCard";
import MainFooter from "@/components/mainFooter/mainFooter";

export default function Home() {
  return <>
    <MainHeader/>
    <div className={"space50"}></div>
    <MainHero/>
    <div className={styles.container1}>
      <div className={styles.frase1}>
        <p>"We have created a pack of tools that is everything small business need to <span className="clasicBlue">start conquering the digital era."</span></p>
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
