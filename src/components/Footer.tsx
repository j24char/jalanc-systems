import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Jalanc Systems LLC</div>
      <div className={styles.links}>
        <Link href="/#capabilities">Capabilities</Link>
        <Link href="/#apps">Work</Link>
        <Link href="/#reviews">Reviews</Link>
        <Link href="/#contact">Contact</Link>
      </div>
      <div className={styles.copy}>
        © {new Date().getFullYear()} Jalanc Systems LLC. All rights reserved.
      </div>
    </footer>
  )
}
