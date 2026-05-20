'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>First Name</label>
          <input className={styles.input} type="text" placeholder="Alex" />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Last Name</label>
          <input className={styles.input} type="text" placeholder="Morgan" />
        </div>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Email Address</label>
        <input className={styles.input} type="email" placeholder="alex@company.com" />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Project Type</label>
        <select className={styles.select}>
          <option value="" disabled>Select one</option>
          <option>Web Application</option>
          <option>Mobile App</option>
          <option>API / Backend</option>
          <option>Technical Consulting</option>
          <option>Cloud / DevOps</option>
          <option>Other</option>
        </select>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Budget Range</label>
        <select className={styles.select}>
          <option value="" disabled>Select range</option>
          <option>Under $5,000</option>
          <option>$5,000 – $15,000</option>
          <option>$15,000 – $50,000</option>
          <option>$50,000+</option>
          <option>Let&apos;s discuss</option>
        </select>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Tell Me About Your Project</label>
        <textarea
          className={styles.textarea}
          placeholder="Describe what you're building, what problems you're solving, and any relevant timelines..."
        />
      </div>
      <button type="submit" className={styles.submit} disabled={loading || submitted}>
        {loading ? 'Sending...' : submitted ? 'Sent ✓' : 'Send Inquiry'}
      </button>
      {submitted && (
        <p className={styles.successMsg}>
          Message sent — I&apos;ll be in touch within 24 hours.
        </p>
      )}
    </form>
  )
}
