'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./TributeForm.module.css";

export default function TributeForm() {
  const [entityType, setEntityType] = useState<'INDIVIDUAL' | 'ORGANIZATION'>('INDIVIDUAL');
  const [orgName, setOrgName] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    relationship: 'INDIVIDUAL',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    // Validation
    if (formData.message.trim().length < 5) {
      setSubmitError('Message must be at least 5 characters long.');
      setIsSubmitting(false);
      return;
    }

    try {
      const body = new FormData();
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      body.append('name', fullName);
      body.append('relationship', formData.relationship);
      body.append('message', formData.message.trim());
      body.append('email', formData.email.trim());
      if (file) body.append('file', file);

      // Use XMLHttpRequest to track upload progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/tributes');
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percent);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            try {
              const json = JSON.parse(xhr.responseText);
              reject(new Error(json?.error || 'Upload failed'));
            } catch (err) {
              reject(new Error('Upload failed'));
            }
          }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(body);
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        relationship: 'INDIVIDUAL',
        message: ''
      });
      setFile(null);
      setPreviewUrl(null);
      setUploadProgress(0);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  // cleanup preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
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
              {formData.relationship === 'ORGANIZATION' && (
        <div>
          <label>Organization Name</label>
          <input
                          className={styles.input} 

            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter organization name"
          />
        </div>
      )}
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

            {/* <div className={styles.formGroup}>
              <label className={styles.label}>What will you remember about Adobea?</label>
              <div className={styles.uploadButtons}>
                <label className={styles.uploadBtn}>
                  <span className={styles.plusIcon}>+</span>
                  <span>add a file</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                </label>
                <label className={styles.uploadBtn}>
                  <span className={styles.plusIcon}>+</span>
                  <span>add a file</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                </label>
              </div>
              <div className={styles.uploadLabels}>
                <span>or Upload Tribute</span>
                <span>or Upload Photos and/or Videos</span>
              </div>
            </div> */}

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
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className={styles.formImage} style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
              <Image 
                src="/images/Tribute.png" 
                alt="Submit your tribute" 
                width={450}
                height={600}
                className={styles.formImage}
              />
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className={styles.progress} aria-hidden>
                <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
                <div className={styles.progressLabel}>{uploadProgress}%</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
