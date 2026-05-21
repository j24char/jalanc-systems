import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { getProjectBySlug, projects } from '@/data/projects'
import styles from './page.module.css'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.name} — Jalanc Systems LLC`,
    description: project.tagline,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === params.slug)
  const prevProject = projects[currentIndex - 1] ?? null
  const nextProject = projects[currentIndex + 1] ?? null

  return (
    <>
      <Nav />
      <main>

        {/* ─── PROJECT HERO ─── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <FadeUp>
            <Link href="/#apps" className={styles.backLink}>← All Projects</Link>
          </FadeUp>
          <FadeUp delay={60}>
            <div className={styles.heroMeta}>
              <span className={styles.heroNum}>{project.num}</span>
              <span className={styles.heroYear}>{project.year}</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className={styles.heroTitle}>{project.name.toUpperCase()}</h1>
          </FadeUp>
          <FadeUp delay={140}>
            <div className={styles.heroType}>{project.type}</div>
            <p className={styles.heroTagline}>{project.tagline}</p>
          </FadeUp>
          <FadeUp delay={180}>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatLabel}>Duration</div>
                <div className={styles.heroStatValue}>{project.duration}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatLabel}>Role</div>
                <div className={styles.heroStatValue}>{project.role}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatLabel}>Status</div>
                <div className={styles.heroStatValue}>{project.status}</div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ─── PROJECT LOGO ─── */}
        {project.logo && (
          <section className={styles.logoSection}>
            <FadeUp>
              <div className={styles.logoWrap}>
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className={styles.projectLogo}
                />
              </div>
            </FadeUp>
          </section>
        )}

        {/* ─── OVERVIEW ─── */}
        <section className={styles.section}>
          <div className={styles.overviewGrid}>
            <FadeUp>
              <div className={styles.overviewMain}>
                <div className={styles.blockLabel}>Overview</div>
                <p className={styles.bodyLg}>{project.description}</p>
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <div className={styles.stackPanel}>
                <div className={styles.blockLabel}>Tech Stack</div>
                <div className={styles.stackList}>
                  {project.stack.map((s) => (
                    <div key={s} className={styles.stackItem}>{s}</div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ─── CHALLENGE / SOLUTION / OUTCOME ─── */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.csoGrid}>
            <FadeUp>
              <div className={styles.csoBlock}>
                <div className={styles.csoNum}>01</div>
                <div className={styles.csoTitle}>The Challenge</div>
                <p className={styles.csoBody}>{project.challenge}</p>
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <div className={styles.csoBlock}>
                <div className={styles.csoNum}>02</div>
                <div className={styles.csoTitle}>The Solution</div>
                <p className={styles.csoBody}>{project.solution}</p>
              </div>
            </FadeUp>
            <FadeUp delay={160}>
              <div className={styles.csoBlock}>
                <div className={styles.csoNum}>03</div>
                <div className={styles.csoTitle}>The Outcome</div>
                <p className={styles.csoBody}>{project.outcome}</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ─── PROJECT NAVIGATION ─── */}
        <section className={styles.projectNav}>
          <div className={styles.projectNavInner}>
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`} className={styles.projectNavLink}>
                <div className={styles.projectNavDir}>← Previous Project</div>
                <div className={styles.projectNavName}>{prevProject.name.toUpperCase()}</div>
                <div className={styles.projectNavType}>{prevProject.type}</div>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`} className={`${styles.projectNavLink} ${styles.projectNavLinkRight}`}>
                <div className={styles.projectNavDir}>Next Project →</div>
                <div className={styles.projectNavName}>{nextProject.name.toUpperCase()}</div>
                <div className={styles.projectNavType}>{nextProject.type}</div>
              </Link>
            ) : <div />}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
