import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { applicationSchema, type ApplicationFormData, sourceOptions } from '@/lib/validation'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface FieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-sans font-semibold tracking-widest uppercase text-[#6B7280]">
        {label}
        {required && <span className="text-[#4ADE80] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-sans text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'w-full bg-[#14181F] border border-white/10 rounded-sm px-4 py-3 font-sans text-sm text-[#F8F7F4] placeholder:text-[#6B7280]/50 focus:outline-none focus:border-[#4ADE80]/50 transition-colors duration-200'

export default function ApplicationForm() {
  const { ref, inView } = useScrollReveal()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = (data: ApplicationFormData) => {
    console.log('GT Coaching Application Submission:', data)
    // TODO: Replace with webhook / CRM integration
    // fetch('/api/apply', { method: 'POST', body: JSON.stringify(data) })
    setSubmitted(true)
  }

  return (
    <Section id="apply" dark={false}>
      <Container>
        <div ref={ref} className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4">
              Apply Now
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#0A0E14] leading-tight text-balance mb-4">
              Ready to close the gap?
            </h2>
            <p className="font-sans text-sm text-[#6B7280] leading-relaxed">
              Complete this application and we'll be in touch within 5 business days.
              There is no obligation — just an honest conversation about whether we're the right fit.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0A0E14] border border-[#4ADE80]/20 rounded-sm p-10 text-center flex flex-col gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#4ADE80]/10 flex items-center justify-center mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4ADE80]">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#F8F7F4]">
                Application received.
              </h3>
              <p className="font-sans text-sm text-[#6B7280] max-w-sm mx-auto leading-relaxed">
                Thank you for taking this step. We'll review your application and reach out within 5 business days.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-[#0A0E14] border border-white/5 rounded-sm p-8 md:p-10 flex flex-col gap-7"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full Name" error={errors.fullName?.message} required>
                  <input
                    {...register('fullName')}
                    type="text"
                    id="fullName"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className={cn(inputBase, errors.fullName && 'border-red-400/50')}
                  />
                </Field>

                <Field label="Email Address" error={errors.email?.message} required>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={cn(inputBase, errors.email && 'border-red-400/50')}
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="WhatsApp Number" error={errors.phone?.message} required>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className={cn(inputBase, errors.phone && 'border-red-400/50')}
                  />
                </Field>

                <Field label="City / Location" error={errors.city?.message} required>
                  <input
                    {...register('city')}
                    type="text"
                    id="city"
                    autoComplete="address-level2"
                    placeholder="Mumbai, India"
                    className={cn(inputBase, errors.city && 'border-red-400/50')}
                  />
                </Field>
              </div>

              <Field label="How you heard about us" error={errors.source?.message} required>
                <select
                  {...register('source')}
                  id="source"
                  className={cn(
                    inputBase,
                    'appearance-none cursor-pointer',
                    errors.source && 'border-red-400/50'
                  )}
                >
                  {sourceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Describe your current weekly schedule"
                error={errors.weeklySchedule?.message}
                required
              >
                <textarea
                  {...register('weeklySchedule')}
                  id="weeklySchedule"
                  rows={3}
                  placeholder="Walk us through a typical week — your role, key responsibilities, hours, and how you currently spend your energy."
                  className={cn(inputBase, 'resize-none', errors.weeklySchedule && 'border-red-400/50')}
                />
              </Field>

              <Field
                label="What have you already tried?"
                error={errors.pastAttempts?.message}
                required
              >
                <textarea
                  {...register('pastAttempts')}
                  id="pastAttempts"
                  rows={3}
                  placeholder="Tell us what you've already done to develop your leadership — courses, coaching, mentoring, books, anything relevant."
                  className={cn(inputBase, 'resize-none', errors.pastAttempts && 'border-red-400/50')}
                />
              </Field>

              <Field
                label="What is the specific outcome you want from coaching?"
                error={errors.goal?.message}
                required
              >
                <textarea
                  {...register('goal')}
                  id="goal"
                  rows={4}
                  placeholder="Be specific. What does success look like for you in 6–12 months? What needs to change, and why does it matter to you right now?"
                  className={cn(inputBase, 'resize-none', errors.goal && 'border-red-400/50')}
                />
              </Field>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                <Button
                  type="submit"
                  variant="green"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <p className="font-sans text-xs text-[#6B7280] leading-relaxed">
                  No spam. No hard sell. Your information is confidential.
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </Container>
    </Section>
  )
}
