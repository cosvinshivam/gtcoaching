import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <>
      <Header />
      <main className="bg-white pt-40 pb-24">
        <Container>
          <div className="text-center mb-20">
            <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-black mb-8 block">Investment</span>
            <h1 className="text-5xl md:text-9xl font-medium tracking-tighter uppercase mb-12">
              Performance <br />
              <span className="text-[#C4C4C4]">Pricing</span>
            </h1>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-6 mt-16">
               <span className={cn("text-sm font-bold uppercase transition-colors", !isYearly ? "text-black" : "text-grey")}>Monthly</span>
               <button 
                 onClick={() => setIsYearly(!isYearly)}
                 className="w-16 h-8 bg-black/5 rounded-full p-1 relative flex items-center"
               >
                  <motion.div 
                    animate={{ x: isYearly ? 32 : 0 }}
                    className="w-6 h-6 bg-green rounded-full shadow-lg"
                  />
               </button>
               <span className={cn("text-sm font-bold uppercase transition-colors", isYearly ? "text-black" : "text-grey")}>Yearly <span className="text-green text-[10px] ml-1">-20%</span></span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
             {[
               { name: 'Elite', price: 499, highlight: false },
               { name: 'Pro', price: 899, highlight: true },
               { name: 'Team', price: 1299, highlight: false }
             ].map((plan) => (
               <div 
                 key={plan.name}
                 className={cn(
                   "p-12 rounded-[4rem] border transition-all duration-500",
                   plan.highlight ? "bg-black text-white h-[110%] z-10 shadow-3xl" : "bg-offwhite text-black border-black/5"
                 )}
               >
                  <h3 className="text-2xl font-bold mb-10 uppercase tracking-tighter">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-12">
                     <span className="text-6xl md:text-7xl font-bold tracking-tighter">
                        ${isYearly ? Math.floor(plan.price * 0.8) : plan.price}
                     </span>
                     <span className="text-sm font-bold uppercase text-grey">/mo</span>
                  </div>
                  <ul className="flex flex-col gap-6 mb-16">
                     {['Personal Training', 'Nutrition Plan', 'Recovery Protocol', '24/7 Support'].map(f => (
                       <li key={f} className="flex gap-4 items-center font-bold text-sm">
                          <div className={cn("w-2 h-2 rounded-full", plan.highlight ? "bg-green" : "bg-black")} />
                          {f}
                       </li>
                     ))}
                  </ul>
                  <Button variant="athlenia" className="w-full justify-center">Get Started</Button>
               </div>
             ))}
          </div>

          {/* Comparison Table Placeholder */}
          <div className="mt-40 pt-24 border-t border-black/10">
             <h2 className="text-4xl font-bold uppercase mb-16 text-center">Compare Features</h2>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-black/10">
                         <th className="py-8 font-bold text-grey uppercase text-[10px] tracking-widest">Feature</th>
                         <th className="py-8 font-bold uppercase">Elite</th>
                         <th className="py-8 font-bold uppercase">Pro</th>
                         <th className="py-8 font-bold uppercase">Team</th>
                      </tr>
                   </thead>
                   <tbody className="font-bold text-sm">
                      {[
                        'Biometric Tracking', 'Custom Meal Plans', 'Priority Booking', 'Lounge Access'
                      ].map(feature => (
                        <tr key={feature} className="border-b border-black/5">
                           <td className="py-8 text-grey">{feature}</td>
                           <td className="py-8">✓</td>
                           <td className="py-8">✓</td>
                           <td className="py-8">✓</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
