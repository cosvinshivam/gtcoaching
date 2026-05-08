import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Problem from '@/components/sections/Problem'
import Included from '@/components/sections/Included'
import Steps from '@/components/sections/Steps'
import Transformations from '@/components/sections/Transformations'
import Testimonials from '@/components/sections/Testimonials'
import LeadMagnet from '@/components/sections/LeadMagnet'
import FAQ from '@/components/sections/FAQ'
import ApplicationForm from '@/components/sections/ApplicationForm'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Included />
        <Steps />
        <Transformations />
        <Testimonials />
        <LeadMagnet />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}
