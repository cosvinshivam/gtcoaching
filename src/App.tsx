import StickyBar from '@/components/layout/StickyBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Problem from '@/components/sections/Problem'
import WhoFor from '@/components/sections/WhoFor'
import Transformations from '@/components/sections/Transformations'
import Included from '@/components/sections/Included'
import Steps from '@/components/sections/Steps'
import Testimonials from '@/components/sections/Testimonials'
import LeadMagnet from '@/components/sections/LeadMagnet'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import ApplicationForm from '@/components/sections/ApplicationForm'

export default function App() {
  return (
    <>
      <StickyBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <WhoFor />
        <Transformations />
        <Included />
        <Steps />
        <Testimonials />
        <LeadMagnet />
        <About />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}
