export interface Review {
  name: string
  role: string
  company: string
  stars: number
  text: string
}

export const reviews: Review[] = [
  {
    name: 'Marcus A.',
    role: 'Co-founder',
    company: 'FlowDesk Inc.',
    stars: 5,
    text: 'Working with Jalanc was a turning point for our product. The architecture decisions alone saved us months of technical debt. Delivered exactly what was promised, ahead of schedule.',
  },
  {
    name: 'Priya S.',
    role: 'VP Engineering',
    company: 'VaultPay',
    stars: 5,
    text: 'The payment system integration was flawless. We had a hard compliance deadline and not only did we hit it, the code quality exceeded what our internal team would have produced.',
  },
  {
    name: 'Jordan K.',
    role: 'Founder',
    company: 'TrackMile',
    stars: 5,
    text: 'The app shipped on time, the code is clean and well-documented, and the performance is buttery smooth. I get compliments from users about the UX every week. Will absolutely hire again.',
  },
  {
    name: 'Diane T.',
    role: 'Director of Operations',
    company: 'RetailCore',
    stars: 4,
    text: 'Our data consolidation project was complex — 20+ integrations, multiple stakeholders, tight timelines. Jalanc handled every curveball with professionalism. The platform has transformed how we operate.',
  },
]

export const ratingBreakdown = [
  { label: 'Communication', score: 5.0 },
  { label: 'Code Quality', score: 5.0 },
  { label: 'On-time Delivery', score: 4.8 },
  { label: 'Value', score: 4.9 },
]

export const overallScore = 4.9
