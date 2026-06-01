'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const storedSessionId =
      typeof window !== 'undefined' ? window.sessionStorage.getItem('session_id') : ''
    const sessionId =
      storedSessionId ||
      (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : '')

    if (sessionId && typeof window !== 'undefined' && !storedSessionId) {
      window.sessionStorage.setItem('session_id', sessionId)
    }

    const lead = {
      name: `${formData.get('firstName') || ''} ${formData.get('lastName') || ''}`.trim(),
      email: formData.get('email') || '',
      project_type: formData.get('projectType') || '',
      timeline: formData.get('timeline') || '',
      message: formData.get('message') || '',
      page: 'Contact',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      session_id: sessionId,
      source: 'website',
      status: 'new',
      utm: typeof window !== 'undefined' ? window.location.search : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })

      if (!response.ok) {
        throw new Error('Lead submission failed')
      }

      setSubmitted(true)
      form.reset()
    } catch (err) {
      console.error('Error submitting lead:', err)
      setError('Failed to send. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>First Name</label>
          <input name="firstName" className={styles.input} type="text" placeholder="Alex" required />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Last Name</label>
          <input name="lastName" className={styles.input} type="text" placeholder="Morgan" required />
        </div>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Email Address</label>
        <input name="email" className={styles.input} type="email" placeholder="alex@company.com" required />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Project Type</label>
        <select name="projectType" className={styles.select} defaultValue="" required>
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
        <label className={styles.label}>Timeline</label>
        <select name="timeline" className={styles.select} defaultValue="" required>
          <option value="" disabled>Select timeline</option>
          <option>ASAP</option>
          <option>1-2 months</option>
          <option>3-6 months</option>
          <option>6+ months</option>
          <option>Flexible</option>
        </select>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Tell Me About Your Project</label>
        <textarea
          name="message"
          className={styles.textarea}
          placeholder="Describe what you're building, what problems you're solving, and any relevant timelines..."
        />
      </div>
      <button type="submit" className={styles.submit} disabled={loading || submitted}>
        {loading ? 'Sending...' : submitted ? 'Sent' : 'Send Inquiry'}
      </button>
      {error && <p className={styles.errorMsg}>{error}</p>}
      {submitted && (
        <p className={styles.successMsg}>
          Message sent. I&apos;ll be in touch within 24 hours.
        </p>
      )}
    </form>
  )
}
