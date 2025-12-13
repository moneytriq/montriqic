import styles from "./recent-activities-grid.module.css";
import RecentActivityCard from "./recent-activity-card";
export default function RecentActivitiesGrid({
  activities = [],
  baseUrl = null,
  label = null,
}) {
  if (activities.length < 1) {
    return <p className="no-data">No activity yet.</p>;
  }
  return (
    <div className={styles.recentActivitiesGrid}>
      {activities.map((activity, index) => (
        <RecentActivityCard
          key={index}
          activity={activity}
          baseUrl={baseUrl}
          label={label}
        />
      ))}
    </div>
  );
}
