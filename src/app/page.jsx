import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import StoryShell from '@/components/graph/StoryShell'
import Hero from '@/components/sections/Hero'
import ProblemSection from '@/components/sections/ProblemSection'
import ValueSection from '@/components/sections/ValueSection'
import ServicesBento from '@/components/sections/ServicesBento'
import SystemMap from '@/components/sections/SystemMap'
import AISection from '@/components/sections/AISection'
import TrustSection from '@/components/sections/TrustSection'
import UseCases from '@/components/sections/UseCases'
import MarqueeQuotes from '@/components/sections/MarqueeQuotes'
import FinalCta from '@/components/sections/FinalCta'

export default function Home() {
  return (
    <StoryShell>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <ProblemSection />
        <ValueSection />
        <ServicesBento />
        <SystemMap />
        <AISection />
        <TrustSection />
        <UseCases />
        <MarqueeQuotes />
        <FinalCta />
      </main>
      <SiteFooter />
    </StoryShell>
  )
}
