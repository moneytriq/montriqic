import AccountCard from "./account-card";
import styles from "./account-cards-grid.module.css";

export default function AccountCardsgrid({ overview, investmentData = null }) {
  return (
    <div className={styles.accountCardsGrid}>
      {overview.map((accInfo, index) => {
        return (
          <AccountCard
            key={index}
            {...accInfo}
            investmentData={investmentData}
          />
        );
      })}
    </div>
  );
}
