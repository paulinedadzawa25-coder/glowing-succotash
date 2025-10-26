'use client';

import React, { useState } from "react";
import Image from "next/image";
import styles from "./TributeForm.module.css";

export default function TributeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    relationship: 'INDIVIDUAL',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          relationship: formData.relationship,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit tribute');
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        relationship: 'INDIVIDUAL',
        message: ''
      });
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Failed to submit tribute. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <section className={styles.formSection}>
      <div>
        <h2 className={styles.formTitle}>Submit your Tributes</h2>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameGroup}>
              <label className={styles.label}>
                Name
                <span className={styles.required}>(required)</span>
              </label>
              <div className={styles.nameInputs}>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name" 
                  required 
                  className={styles.input} 
                />
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name" 
                  required 
                  className={styles.input} 
                />
              </div>
            </div>

            <div className={styles.radioGroup}>
              <label className={styles.label}>
                On behalf of an
                <span className={styles.required}>(required)</span>
              </label>
              <div className={styles.options}>
                <button 
                  type="button" 
                  className={`${styles.option} ${formData.relationship === 'INDIVIDUAL' ? styles.active : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, relationship: 'INDIVIDUAL' }))}
                >
                  INDIVIDUAL
                </button>
                <button 
                  type="button" 
                  className={`${styles.option} ${formData.relationship === 'ORGANIZATION' ? styles.active : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, relationship: 'ORGANIZATION' }))}
                >
                  ORGANIZATION
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email
                <span className={styles.required}>(required)</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
                className={styles.input} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tribute</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6} 
                className={styles.textarea} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>What will you remember about Adobea?</label>
              <div className={styles.uploadButtons}>
                <button type="button" className={styles.uploadBtn}>
                  <span className={styles.plusIcon}>+</span>
                  <span>add a file</span>
                </button>
                <button type="button" className={styles.uploadBtn}>
                  <span className={styles.plusIcon}>+</span>
                  <span>add a file</span>
                </button>
              </div>
              <div className={styles.uploadLabels}>
                <span>or Upload Tribute</span>
                <span>or Upload Photos and/or Videos</span>
              </div>
            </div>

            {submitError && <div className={styles.error}>{submitError}</div>}
            {submitSuccess && <div className={styles.success}>Tribute submitted successfully!</div>}

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          <div className={styles.imageSection}>
            <Image 
              src="/images/Tribute.png" 
              alt="Submit your tribute" 
              width={450}
              height={600}
              className={styles.formImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
