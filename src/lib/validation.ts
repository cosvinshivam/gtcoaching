import { z } from 'zod'

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .min(7, 'Please enter a valid WhatsApp number')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number'),

  city: z
    .string()
    .min(2, 'Please enter your city')
    .max(100, 'City name is too long'),

  weeklySchedule: z
    .string()
    .min(20, 'Please describe your weekly schedule (at least 20 characters)')
    .max(1000, 'Response is too long'),

  pastAttempts: z
    .string()
    .min(20, 'Please describe your past attempts (at least 20 characters)')
    .max(1000, 'Response is too long'),

  goal: z
    .string()
    .min(20, 'Please describe your goal (at least 20 characters)')
    .max(1000, 'Response is too long'),

  source: z
    .string()
    .min(1, 'Please select how you heard about us'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

export const sourceOptions = [
  { value: '', label: 'Select an option...' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'referral', label: 'Referral / Word of mouth' },
  { value: 'google', label: 'Google Search' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'other', label: 'Other' },
]
