'use client';

import { useEffect, useState } from 'react';
import type { Tribute } from '@/types/tribute';
import styles from './page.module.css';

export default function AdminPage() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTributes();
  }, []);

  const fetchTributes = async () => {
    try {
      const response = await fetch('/api/admin/tributes');
      if (!response.ok) throw new Error('Failed to fetch tributes');
      const data = await response.json();
      setTributes(data);
    } catch (err) {
      setError('Failed to load tributes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (tributeId: string, mediaId: string, status: 'approved' | 'rejected', reason?: string) => {
    try {
      const response = await fetch(`/api/admin/tributes/${tributeId}/media/${mediaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, reason }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      // Refresh tributes after update
      fetchTributes();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      
      <section className={styles.pendingSection}>
        <h2>Pending Approvals</h2>
        <div className={styles.tributeGrid}>
          {tributes
            .filter(tribute => tribute.media?.some(m => m.status === 'pending'))
            .map(tribute => (
              <div key={tribute.id} className={styles.tributeCard}>
                <div className={styles.tributeHeader}>
                  <h3>{tribute.name}</h3>
                  <p>{new Date(tribute.date).toLocaleDateString()}</p>
                </div>
                <div className={styles.tributeBody}>
                  <p><strong>Relationship:</strong> {tribute.relationship}</p>
                  {tribute.organization && (
                    <p><strong>Organization:</strong> {tribute.organization}</p>
                  )}
                  <p><strong>Message:</strong> {tribute.message}</p>
                </div>
                {tribute.media?.map(media => (
                  <div key={media.url} className={styles.mediaItem}>
                    {media.type === 'image' ? (
                      <img 
                        src={media.url} 
                        alt="Tribute media" 
                        className={styles.mediaPreview}
                      />
                    ) : (
                      <video 
                        src={media.url} 
                        controls 
                        className={styles.mediaPreview}
                      />
                    )}
                    {media.status === 'pending' && (
                      <div className={styles.approvalActions}>
                        <button
                          onClick={() => handleApproval(tribute.id, media.url, 'approved')}
                          className={styles.approveButton}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const reason = window.prompt('Reason for rejection:');
                            if (reason) {
                              handleApproval(tribute.id, media.url, 'rejected', reason);
                            }
                          }}
                          className={styles.rejectButton}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </section>

      <section className={styles.historySection}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          {tributes
            .filter(tribute => tribute.media?.some(m => m.status !== 'pending'))
            .map(tribute => (
              <div key={tribute.id} className={styles.activityItem}>
                <div className={styles.activityHeader}>
                  <h4>{tribute.name}&apos;s Tribute</h4>
                  <span>{new Date(tribute.date).toLocaleDateString()}</span>
                </div>
                <div className={styles.mediaGrid}>
                  {tribute.media?.map(media => (
                    <div key={media.url} className={styles.mediaStatus}>
                      <span className={`${styles.status} ${styles[media.status]}`}>
                        {media.status}
                      </span>
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt="Tribute media" 
                          className={styles.thumbnailPreview}
                        />
                      ) : (
                        <video 
                          src={media.url} 
                          className={styles.thumbnailPreview}
                        />
                      )}
                      {media.rejectedReason && (
                        <p className={styles.rejectionReason}>
                          Reason: {media.rejectedReason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}