import styles from './Marquee.module.css'

const ITEMS = [
  'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL',
  'AWS', 'Docker', 'Next.js', 'GraphQL', 'REST APIs',
  'iOS / Android', 'CI/CD',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item} <span className={styles.dot}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
