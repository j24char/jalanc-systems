'use client'


import { useState } from 'react'
import styles from './ContactForm.module.css'



export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Compose the lead object
    const { serverTimestamp } = await import('firebase/firestore');
    const lead = {
      name: `${formData.get('firstName') || ''} ${formData.get('lastName') || ''}`.trim(),
      page: 'Contact',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      projectType: formData.get('projectType') || '',
      sessionId: typeof window !== 'undefined' ? window.sessionStorage.getItem('sessionId') || '' : '',
      source: 'website',
      status: 'new',
      timeline: formData.get('budget') || '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      utm: typeof window !== 'undefined' ? window.location.search : '',
      email: formData.get('email') || '',
      message: formData.get('message') || '',
      createdAt: serverTimestamp(),
    };

    try {
      // Directly add to Firestore
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      await addDoc(collection(db, 'leads'), lead);
      setSubmitted(true);
    } catch (err: any) {
      setError('Failed to send. Please try again later.');
    } finally {
      setLoading(false);
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
        <select name="projectType" className={styles.select} required>
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
        <select name="budget" className={styles.select} required>
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
          name="message"
          className={styles.textarea}
          placeholder="Describe what you're building, what problems you're solving, and any relevant timelines..."
        />
      </div>
      <button type="submit" className={styles.submit} disabled={loading || submitted}>
        {loading ? 'Sending...' : submitted ? 'Sent ✓' : 'Send Inquiry'}
      </button>
      {error && <p className={styles.errorMsg}>{error}</p>}
      {submitted && (
        <p className={styles.successMsg}>
          Message sent — I&apos;ll be in touch within 24 hours.
        </p>
      )}
    </form>
  )
}
