export interface Project {
  slug: string
  name: string
  type: string
  tagline: string
  description: string
  challenge: string
  solution: string
  outcome: string
  stack: string[]
  status: 'Live' | 'Private' | 'App Store' | 'Case Study'
  year: string
  duration: string
  role: string
  num: string
}

export const projects: Project[] = [
  {
    slug: 'SportsBingo2026',
    num: '001',
    name: 'Sports Bingo 2026',
    type: 'Mobile App — Sports Spectator Game',
    tagline: 'Mobile app to make youth sports events more fun.',
    description:
      'A fun take on bingo to make light of the things people say during youth sports events. Features solo and multiplayer modes.',
    challenge:
      'The goal was to rapidly build a fun, polished mobile app on a tight timeline with a small budget. The client wanted to launch in time for 2026 summer sports and needed a product that could scale to millions of users without a large engineering team.',
    solution:
      'Built a serverless application using Next.js and Vercel for instant global scalability. Real-time multiplayer features implemented. Focused on a delightful user experience with bold graphics and intuitive design.',
    outcome:
      'Launched in 2 weeks, meeting the timeline for the 2026 sports season.',
    stack: ['React Native', 'TypeScript', 'Vercel', 'Firebase'],
    status: 'App Store',
    year: '2026',
    duration: '2 weeks',
    role: 'Sole Developer',
  },
  {
    slug: 'InModeration',
    num: '002',
    name: 'InModeration',
    type: 'Web App — Habit Tracker',
    tagline: 'A drink tracking app that helps users build an understanding of their habits and visualize their progress.',
    description:
      'InModeration is a drink tracking app for people looking to quit or even just scale back their alcohol consumption. The app includes a charting feature and various statistics to help gauge where you are at on your journey towards sobriety.',
    challenge:
      'The goal was to create a secure, scalable platform for handling sensitive user data (alcohol consumption habits) while also providing a seamless user experience across both web and mobile. The client wanted robust analytics to help users track their progress over time.',
    solution:
      'Built a full-stack application with a React frontend and Firebase backend. Developed a rich analytics dashboard with interactive charts and personalized insights.',
    outcome:
      'Launched in 2025 and has been steadily growing its user base. Positive feedback on the analytics features, with users reporting increased awareness of their habits.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Vercel'],
    status: 'Live',
    year: '2025',
    duration: '12 weeks',
    role: 'Sole Developer',
  },
  {
    slug: 'Clearview',
    num: '003',
    name: 'Clearview',
    type: 'Web App — Small Business Solution',
    tagline: 'Built for a small window washing business to manage appointments, track customer interactions, and generate reports.',
    description:
      'A simple web application for a small window washing business to allow customers to book appointments online, while also providing the business with tools to manage their schedule, track customer interactions, and generate reports on their operations.',
    challenge:
      'The founder wanted a web app that could be easily maintained without a technical background, while also providing a polished user experience for customers. The app needed to handle appointment scheduling, customer management, and reporting features on a tight budget.',
    solution:
      'Built in React Native with Expo for cross-platform availability. Used Firebase for authentication, database, and hosting to minimize maintenance overhead.',
    outcome:
      'Launched in 2026 and has been successfully managing the business’s appointments and customer interactions. The owner has reported more work than they can handle since launching the app.',
    stack: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Vercel'],
    status: 'Live',
    year: '2026',
    duration: '4 weeks',
    role: 'Sole Developer',
  },
  {
    slug: 'SensorAnalyzer',
    num: '004',
    name: 'SensorAnalyzer',
    type: 'Enterprise — Data Analysis Utility',
    tagline: 'Automated data analysis tool for sensor data.',
    description:
      'A data analysis utility designed for a manufacturing client to process and analyze large volumes of sensor data from their production lines. The tool processes and visualizes sensor data, applying diagnostics and sanity checks.',
    challenge:
      'The client had the need to identify pending sensor failures before they occurred, but lacked the in-house expertise to build a solution. The tool needed to handle large volumes of data, and provide actionable insights.',
    solution:
      'Designed a data analyis pipeline using Python with Pandas and NumPy for data processing, and Matplotlib for visualization. Implemented a web interface using React and FastAPI to allow users to interact with the data and view insights.',
    outcome:
      'The anomaly detection system caught a design flaw in its first month. Full ROI achieved in under 6 months.',
    stack: ['Python', 'React', 'FastAPI', 'Matplotlib', 'Pandas', 'NumPy'],
    status: 'Private',
    year: '2025',
    duration: '8 weeks',
    role: 'Lead Architect & Developer',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
