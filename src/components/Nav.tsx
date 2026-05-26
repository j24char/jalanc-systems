'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'
import logoImage from '../../public/images/JalancSystemsWhiteBanner.svg'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image 
          src={logoImage} 
          alt="Jalanc Systems LLC Logo" 
          height={40} // Adjust this to match design's header height
          priority // Tell Next.js to load this image immediately since it's above the fold
        />
      </Link>
      <ul className={styles.links}>
        <li><Link href="/#capabilities" className={styles.link}>Capabilities</Link></li>
        <li><Link href="/#apps" className={styles.link}>Work</Link></li>
        <li><Link href="/#reviews" className={styles.link}>Reviews</Link></li>
        <li><Link href="/#process" className={styles.link}>Process</Link></li>
      </ul>

      <Link href="/#contact" className={styles.cta}>Start a Project</Link>
    </nav>
  )
}
