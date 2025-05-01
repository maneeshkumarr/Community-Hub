import React from 'react';
import styles from './EventSection.module.css';

const EventSection = ({ events }) => {
  return (
    <div className={styles.eventSection}>
      <h2 className={styles.heading}>Upcoming Events</h2>
      <div className={styles.eventGrid}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <p className={styles.eventDate}>{event.date}</p>
            <p className={styles.eventLocation}>{event.location}</p>
            <button className={styles.eventButton}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;