import styles from "./recent-activities-grid.module.css";
import RecentActivityCard from "./recent-activity-card";
export default function RecentActivitiesGrid({
  activities = [],
  baseUrl,
  label = null,
}) {
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
