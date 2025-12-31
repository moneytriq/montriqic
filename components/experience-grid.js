"use client";

import styles from "./experience-grid.module.css";
import { experienceData } from "@/lib/data/experinceData";

export default function ExperienceGrid() {
  return (
    <>
      <div className={styles.inner}>
        {/* Left (Video) */}
        <div className={styles.videoSection}>
          <div className={styles.videoContainer}>
            <figure className={styles.videoFigure}>
              <video
                className={styles.video}
                width="640"
                height="264"
                src={experienceData.videoUrl}
                controls
                preload="auto"
                onClick={(e) => e.target.play()}
              ></video>
            </figure>
          </div>
        </div>

        {/* Right (Info) */}
        <div className={styles.infoSection}>
          <h2 className={styles.heading}>{experienceData.heading}</h2>

          <p className={styles.description}>{experienceData.description}</p>

          {/* Features */}
          {experienceData.features.map((item, index) => (
            <div className={styles.feature} key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.icon}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" />
              </svg>

              <div>
                <span className={styles.featureTitle}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
