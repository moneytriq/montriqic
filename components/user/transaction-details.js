"use client";
import { iconsConfig } from "@/lib/icons/iconsConfig";
import styles from "./transaction-details.module.css";
import { usePathname, useRouter } from "next/navigation";
import { formatDate, formatNumber, formatTime } from "@/util/util";
import { use, useState } from "react";
import { toast } from "sonner";
import {
  approveUserDeposit,
  denyUserDeposit,
} from "@/actions/approve-user-deposit-action";
import {
  approveUserWithdraw,
  denyUserWithdraw,
} from "@/actions/approve-user-withdraw-action";
import Image from "next/image";
import { approveUserKyc, denyUserKyc } from "@/actions/approve-user-kyc-action";

const ArrowBack = iconsConfig["arrowBack"];

export default function TransactionDetails({ data, label = null, baseUrl }) {
  const path = usePathname();
  const isAction = label === "admin" && data.status === "pending";
  const isKycAction = label === "admin" && data.kyc_status === "pending";
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isDenying, setIsDenying] = useState(false);

  const isAdminKyc = label === "admin" && path.includes("/kyc");

  if (!data) {
    return <p className="no-data">Data does not exist</p>;
  }

  const isWithdraw = data.transaction_type === "withdraw";
  
  const amount =
    data.profit &&
    data.status === "completed" &&
    data.transaction_type === "withdraw"
      ? data.invested_amount + data.profit
      : data.amount || data.invested_amount;

  const transactiondetails = [
    { title: "Type", value: data.transaction_type },
    { title: "Initiator", value: data.initiator },
    {
      title: "Date",
      value: (
        <>
          {formatDate(data.created_at)}{" "}
          <span className={styles.time}>{formatTime(data.created_at)}</span>
        </>
      ),
    },
    {
      title: "Amount",
      value: `${formatNumber(amount)} USD`,
    },
    { title: "Description", value: data.description },
    ...(data.wallet_address ? [{ title: "User Wallet", value: data.wallet_address }] : []),
    { title: "Transaction Ref", value: data.id || data.transaction_id },
    { title: "Status", value: data.status },
  ];
  const kycdetails = [
    { title: "Type", value: "KYC Request" },
    { title: "User ID", value: data.user_id },
    { title: "Full Name", value: data.full_name },
    {
      title: "Date",
      value: (
        <>
          {formatDate(data.created_at)}{" "}
          <span className={styles.time}>{formatTime(data.created_at)}</span>
        </>
      ),
    },
    {
      title: "Document Type",
      value: data.document_type,
    },
    { title: "Country", value: data.country },
    { title: "KYC NO", value: data.kyc_id },
    { title: "Status", value: data.kyc_status },
  ];

  const details = !isAdminKyc ? transactiondetails : kycdetails;

  console.log("trcd", data);

  async function handleDepositApproveClick() {
    setIsApproving(true);
    try {
      const res = await approveUserDeposit(data.user_id, data.id);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Deposit Approved.");

      router.refresh();
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsApproving(false);
    }
  }
  async function handleDepositDenyClick() {
    setIsDenying(true);
    try {
      const res = await denyUserDeposit(data.user_id, data.id);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Deposit Denied.");

      router.replace(baseUrl);
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsDenying(false);
    }
  }
  async function handleWithdrawApproveClick() {
    setIsApproving(true);
    try {
      const res = await approveUserWithdraw(data.user_id, data.id);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Withdrawal Approved.");

      router.refresh();
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsApproving(false);
    }
  }
  async function handleWithdrawDenyClick() {
    setIsDenying(true);
    try {
      const res = await denyUserWithdraw(data.user_id, data.id);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Withdrawal Denied.");

      router.replace(baseUrl);
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsDenying(false);
    }
  }
  async function handleApproveKYCClick() {
    setIsApproving(true);
    try {
      const res = await approveUserKyc(data.user_id);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("KYC Approved.");

      router.refresh();
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsApproving(false);
    }
  }
  async function handleDenyKYCClick() {
    setIsDenying(true);
    try {
      const res = await denyUserKyc(data.user_id, data.kyc_id);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("KYC Denied.");

      router.replace(baseUrl);
    } catch (error) {
      console.error("Supabase Error", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsDenying(false);
    }
  }

  const approveClick = !isWithdraw
    ? handleDepositApproveClick
    : handleWithdrawApproveClick;
  const denyClick = !isWithdraw
    ? handleDepositDenyClick
    : handleWithdrawDenyClick;

  return (
    <div className={styles.transactionDetailsContainer}>
      <ul>
        {details.map((detail, index) => {
          return (
            <li key={detail.title}>
              <p>{detail.title}</p>
              <p>{detail.value}</p>
            </li>
          );
        })}
      </ul>

      {isAdminKyc && (
        <div className={styles.imageGroup}>
          <div className={styles.imageWrapper}>
            <Image
              src={data.document_image_url}
              alt={`kyc-doc-image`}
              fill
              sizes="50vw"
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={data.selfie_image_url}
              alt={`kyc-doc-image`}
              fill
              sizes="50vw"
            />
          </div>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => router.back()}>
          <ArrowBack /> Back
        </button>

        {isAction && (
          <div className={styles.actionButtonGroup}>
            <button
              type="button"
              style={{ background: "var(--red-400)" }}
              onClick={denyClick}
            >
              {isDenying ? "Denying..." : "Deny"}
            </button>

            <button
              type="button"
              style={{ background: "var(--blue-500)" }}
              onClick={approveClick}
            >
              {isApproving ? "Approving..." : "Approve"}
            </button>
          </div>
        )}
        {isKycAction && (
          <div className={styles.actionButtonGroup}>
            <button
              type="button"
              style={{ background: "var(--red-400)" }}
              onClick={handleDenyKYCClick}
            >
              {isDenying ? "Denying..." : "Deny KYC"}
            </button>

            <button
              type="button"
              style={{ background: "var(--blue-500)" }}
              onClick={handleApproveKYCClick}
            >
              {isApproving ? "Approving..." : "Approve KYC"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
