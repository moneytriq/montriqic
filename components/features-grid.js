import Image from "next/image";
import styles from "./features-grid.module.css";
import { featuresData } from "@/lib/data/featuresData";

export default function FeaturesGrid() {
  return (
    <div className={styles.grid}>
      {featuresData.map((item, index) => (
        <div key={index} className={styles.card}>
          {/* ICON TYPE */}
          {item.type === "icon" && (
            <div
              className={styles.outerCircle}
              style={{ backgroundColor: item.bgOuter }}
            >
              <div
                className={styles.innerCircle}
                style={{ backgroundColor: item.bgInner }}
              >
                {item.iconType === "trend" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className={styles.icon}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M19.375 15.103A8.001 8.001 0 0 0 8.03 5.053l-.992-1.737A9.996 9.996 0 0 1 17 3.34c4.49 2.592 6.21 8.142 4.117 12.77l1.342.774-4.165 2.214-.165-4.714 1.246.719zM4.625 8.897a8.001 8.001 0 0 0 11.345 10.05l.992 1.737A9.996 9.996 0 0 1 7 20.66C2.51 18.068.79 12.518 2.883 7.89L1.54 7.117l4.165-2.214.165 4.714-1.246-.719zm8.79 5.931L10.584 12l-2.828 2.828-1.414-1.414 4.243-4.242L13.414 12l2.829-2.828 1.414 1.414-4.243 4.242z" />
                  </svg>
                )}

                {item.iconType === "users" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className={styles.icon}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5 9a1 1 0 0 1 1 1 6.97 6.97 0 0 1 4.33 1.5h2.17c1.333 0 2.53.58 3.354 1.5H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.79 0-5.15-.603-7.06-1.658A.998.998 0 0 1 5 20H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zm1.001 3L6 17.022l.045.032C7.84 18.314 10.178 19 13 19c3.004 0 5.799-1.156 7.835-3.13l.133-.133-.12-.1a2.994 2.994 0 0 0-1.643-.63L19 15h-2.111c.072.322.111.656.111 1v1H8v-2l6.79-.001-.034-.078a2.501 2.501 0 0 0-2.092-1.416L12.5 13.5H9.57A4.985 4.985 0 0 0 6.002 12zM4 11H3v7h1v-7zm14-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                )}
              </div>
            </div>
          )}

          {/* IMAGE TYPE */}
          {item.type === "image" && (
            <div className={styles.imgContainer}>
              <Image
                src={item.img}
                alt=""
                className={styles.img}
                fill
                sizes="30vw"
              />
            </div>
          )}

          {/* CONTENT */}
          {item.title && <h3 className={styles.title}>{item.title}</h3>}
          <p className={styles.text}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
