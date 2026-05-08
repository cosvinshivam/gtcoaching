import Container from '@/components/ui/Container'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ApplicationForm from '@/components/sections/ApplicationForm'

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-white pt-40 pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
             <div>
                <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-black mb-8 block">Connect</span>
                <h1 className="text-5xl md:text-9xl font-medium tracking-tighter uppercase mb-16">
                  Get in <br />
                  <span className="text-[#C4C4C4]">Touch</span>
                </h1>
                
                <div className="flex flex-col gap-12">
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-grey mb-4">Email us</p>
                      <a href="mailto:performance@athlenia.com" className="text-3xl md:text-4xl font-bold hover:text-green transition-colors">performance@athlenia.com</a>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-grey mb-4">Call us</p>
                      <a href="tel:+97150000000" className="text-3xl md:text-4xl font-bold hover:text-green transition-colors">+971 50 000 000</a>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-grey mb-4">Office</p>
                      <p className="text-3xl md:text-4xl font-bold">Dubai Design District, UAE</p>
                   </div>
                </div>
             </div>

             <div className="bg-offwhite p-12 md:p-20 rounded-[4rem]">
                <ApplicationForm />
             </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
