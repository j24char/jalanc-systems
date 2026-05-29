import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Marquee from '@/components/Marquee'
import FadeUp from '@/components/FadeUp'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { reviews, ratingBreakdown, overallScore } from '@/data/reviews'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Nav />
      <main>

        {/* ─── HERO ─── */}
        <section className={styles.hero}>
          <div className={styles.heroGridBg} />
          <div className={styles.heroCornerDecor} />
          <div className={styles.heroTag}>Solo Developer &amp; Consultant</div>
          <h1 className={styles.heroTitle}>
            PRECISION<br />
            <span className={styles.silver}>SOFTWARE</span><br />
            <span className={styles.dim}>BUILT</span> TO LAST
          </h1>
          <p className={styles.heroSub}>
            Full-stack development, systems architecture, and digital product consulting —
            engineered with precision for founders, startups, and businesses that demand excellence.
          </p>
          <div className={styles.heroActions}>
            <Link href="#contact" className="btn-primary">Start a Project</Link>
            <Link href="#apps" className={styles.btnGhost}>View My Work</Link>
          </div>
          <div className={styles.heroStats}>
            <div>
              <div className={styles.statNum}>8+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div>
              <div className={styles.statNum}>10+</div>
              <div className={styles.statLabel}>Projects Shipped</div>
            </div>
            <div>
              <div className={styles.statNum}>100%</div>
              <div className={styles.statLabel}>Project Completion</div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* ─── CAPABILITIES ─── */}
        <section id="capabilities" className={styles.section}>
          <FadeUp>
            <div className="section-header">
              <div>
                <div className="section-num">01 — Capabilities</div>
                <h2>WHAT WE BUILD</h2>
              </div>
              <div className="section-aside">
                End-to-end development<br />
                from concept to deployment
              </div>
            </div>
          </FadeUp>
          <div className={styles.capGrid}>
            {CAPABILITIES.map((cap, i) => (
              <FadeUp key={cap.title} delay={i * 60}>
                <div className={styles.capCard}>
                  <div className={styles.capIcon}>{cap.icon}</div>
                  <div className={styles.capTitle}>{cap.title}</div>
                  <p className={styles.capDesc}>{cap.desc}</p>
                  <div className={styles.capTags}>
                    {cap.tags.map(t => <span key={t} className={styles.capTag}>{t}</span>)}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ─── APPS / WORK ─── */}
        <section id="apps" className={`${styles.section} ${styles.sectionDark}`}>
          <FadeUp>
            <div className="section-header">
              <div>
                <div className="section-num">02 — Portfolio</div>
                <h2>COMPLETED WORK</h2>
              </div>
              <div className="section-aside">
                Production apps &amp;<br />
                delivered projects
              </div>
            </div>
          </FadeUp>
          <div className={styles.appsGrid}>
            {projects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 80}>
                <Link href={`/work/${project.slug}`} className={styles.appCard}>
                  <div className={styles.appCardLeft}>
                    <div className={styles.appNum}>{project.num}</div>
                    <div className={styles.appName}>{project.name.toUpperCase()}</div>
                    <div className={styles.appType}>{project.type}</div>
                    <p className={styles.appDesc}>{project.tagline}</p>
                    <div className={styles.appStack}>
                      {project.stack.slice(0, 4).map(s => (
                        <span key={s} className="stack-pill">{s}</span>
                      ))}
                    </div>
                    <div className={styles.appCorner}>View Project →</div>
                  </div>
                  {project.logo && (
                    <div className={styles.appLogoWrap}>
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className={styles.appLogo}
                      />
                    </div>
                  )}
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ─── REVIEWS ─── */}
        <section id="reviews" className={styles.section}>
          <FadeUp>
            <div className="section-header">
              <div>
                <div className="section-num">03 — Testimonials</div>
                <h2>CLIENT REVIEWS</h2>
              </div>
              <div className="section-aside">
                From founders &amp;<br />
                engineering leaders
              </div>
            </div>
          </FadeUp>
          <div className={styles.reviewsLayout}>
            <FadeUp className={styles.reviewsSidebar}>
              <div className={styles.overallScore}>{overallScore}</div>
              <div className={styles.scoreLabel}>Average Rating</div>
              {ratingBreakdown.map(r => (
                <div key={r.label} className={styles.scoreBarWrap}>
                  <div className={styles.scoreBarLabel}>
                    <span>{r.label}</span><span>{r.score.toFixed(1)}</span>
                  </div>
                  <div className={styles.scoreBarTrack}>
                    <div className={styles.scoreBarFill} style={{ width: `${(r.score / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </FadeUp>
            <FadeUp className={styles.reviewsList} delay={100}>
              {reviews.map((r) => (
                <div key={r.name} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div>
                      <div className={styles.reviewerName}>{r.name}</div>
                      <div className={styles.reviewerRole}>{r.role} — {r.company}</div>
                    </div>
                    <div className={styles.reviewStars}>
                      {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                    </div>
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section id="process" className={`${styles.section} ${styles.sectionDark}`}>
          <FadeUp>
            <div className="section-header">
              <div>
                <div className="section-num">04 — How It Works</div>
                <h2>THE PROCESS</h2>
              </div>
              <div className="section-aside">
                Transparent workflow<br />
                from brief to launch
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className={styles.processSteps}>
              {PROCESS.map((step, i) => (
                <div key={step.title} className={styles.processStep}>
                  <div className={`${styles.stepDot} ${i === 0 ? styles.stepDotActive : ''}`} />
                  <div className={styles.stepNum}>Step 0{i + 1}</div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className={styles.section}>
          <FadeUp>
            <div className="section-header">
              <div>
                <div className="section-num">05 — Get In Touch</div>
                <h2>START A PROJECT</h2>
              </div>
              <div className="section-aside">
                Find out how<br />
                we can help
              </div>
            </div>
          </FadeUp>
          <div className={styles.contactLayout}>
            <FadeUp>
              <div className={styles.contactInfo}>
                <h3 className={styles.contactHeading}>LET&apos;S BUILD SOMETHING WORTH LAUNCHING</h3>
                <p className={styles.contactBody}>
                  Have an idea, an existing project, or just want to explore what&apos;s possible?
                  I&apos;m available for new engagements — from short consulting retainers to
                  long-term product partnerships.
                </p>
                <div className={styles.contactDetail}>
                  <div className={styles.contactIcon}>@</div>
                  <span>information@jalancsystems.com</span>
                </div>
                {/* <div className={styles.contactDetail}>
                  <div className={styles.contactIcon}>↗</div>
                  <span>linkedin.com/in/jalancsystems</span>
                </div>
                <div className={styles.contactDetail}>
                  <div className={styles.contactIcon}>{'{ }'}</div>
                  <span>github.com/jalancsystems</span>
                </div> */}
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <ContactForm />
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

const CAPABILITIES = [
  {
    icon: '[ WEB ]',
    title: 'Web Applications',
    desc: 'Modern, performant web apps built with battle-tested frameworks. From complex SPAs to server-rendered platforms that scale.',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  },
  {
    icon: '[ API ]',
    title: 'API & Backend Systems',
    desc: 'Robust REST and GraphQL APIs, microservices, and backend architectures designed for reliability and growth.',
    tags: ['REST', 'GraphQL', 'Python', 'Postgres'],
  },
  {
    icon: '[ MOB ]',
    title: 'Mobile Applications',
    desc: 'Cross-platform iOS and Android apps built with React Native — one codebase, native performance, polished UX.',
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    icon: '[ EMB ]',
    title: 'Embedded & IoT Software',
    desc: 'Firmware and software for embedded devices and hardware integrations. Bridging the gap between physical products and digital experiences.',
    tags: ['Firmware', 'ARM', 'Embedded Systems', 'Telematics'],
  },
  {
    icon: '[ DAT ]',
    title: 'Data & Integrations',
    desc: 'Database setup, third-party integrations, and data-driven features that give your product an edge.',
    tags: ['SQL', 'Firebase', 'Supabase', 'Stripe'],
  },
  {
    icon: '[ CON ]',
    title: 'Technical Consulting',
    desc: 'Architecture reviews, code audits, technology roadmapping, and fractional CTO services for growing teams.',
    tags: ['Architecture', 'Roadmap', 'Audit', 'Strategy'],
  },
]

const PROCESS = [
  {
    title: 'Discovery & Brief',
    desc: 'We dig into your goals, constraints, and vision. We ask the hard questions so we align before a single line of code is written.',
  },
  {
    title: 'Scope & Architecture',
    desc: 'A clear technical plan: stack decisions, system design, milestones, and a fixed-scope proposal so there are no surprises.',
  },
  {
    title: 'Build & Iterate',
    desc: 'Regularly scheduled demos, updates, and tight feedback loops. You see real progress — not radio silence — throughout the build.',
  },
  {
    title: 'Launch & Handoff',
    desc: 'Rigorous testing, clean deployment, and full documentation. You own everything — code, infrastructure, and knowledge.',
  },
]
