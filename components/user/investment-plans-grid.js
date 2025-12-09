import styles from "./investment-plans-grid.module.css";
import DashboardButton from "../ui/dashboard-button";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { formatNumber } from "@/util/util";

export default async function InvestmentPlansGrid() {
  const supabase = await createSupabaseServerClient();

  try {
    const { data: investmentPlansData, error: investmentPlansError } =
      await supabase.from("investment_plans").select("*");
    if (investmentPlansError) throw investmentPlansError;
   
    
    return (
      <>
        {investmentPlansData.length < 1 && <p className="no-data">No Data</p>}
        <div className={styles.investmentPlansGrid}>
          {investmentPlansData.map((data, index) => {
            return (
              <div className={styles.investmentPlanCard} key={index}>
                <header>
                  <h1>{data.label}</h1>
                  <p className={styles.description}>
                    {data.markets.join(" + ")}
                  </p>

                  <div>
                    <p>
                      <span>{data.interest_rate}%</span>
                      <span>Daily Interest</span>
                    </p>
                    <p>
                      <span>{data.term_duration}</span>
                      <span>Term {data.term}</span>
                    </p>
                  </div>
                </header>

                <ul className={styles.content}>
                  <li>
                    <span>Min Deposit</span>
                    <span>{formatNumber(data.min_deposit)} USD</span>
                  </li>

                  <li>
                    <span>Max Deposit</span>
                    <span>{formatNumber(data.max_deposit)} USD</span>
                  </li>

                  <li>
                    <span>Term Duration</span>
                    <span>
                      {data.term_duration} {data.term}
                    </span>
                  </li>

                  <li>
                    <span>Capital Return</span>{" "}
                    <span>{data.capital_return}</span>
                  </li>

                  <li>
                    <span>Total Return</span> <span>{data.total_return}%</span>
                  </li>
                </ul>

                <DashboardButton
                  href={`/investment/invest?selected=${data.id}`}
                  theme="blue-400"
                  text="Invest & Earn"
                >
                  Invest Now
                </DashboardButton>
              </div>
            );
          })}
        </div>
      </>
    );
  } catch (error) {
    console.error("Supabase error:", error.message);
    return (
      <p className="data-fetching-error">
        Something went wrong, please try again.
      </p>
    );
  }
}
