"use client";
import { deleteUser } from "@/actions/delete-user-action";
import styles from "./delete-user-button.module.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({ userId }) {
  const router = useRouter();
  async function handleClick() {
    try {
      const res = await deleteUser(userId);
      if (res.success) {
        toast.success(res.message);
        router.replace("/admin/manage-users");
      }
    } catch (error) {
      console.error("Error", error.message);
      if (error.message === "User does not exist") {
        toast.error(error.message);
        return;
      }

      toast.error("Could not delete user. Please try again later");
    }
  }
  return (
    <div className={styles.deleteUserButtonContainer}>
      <button type="button" onClick={handleClick}>
        Delete User
      </button>
    </div>
  );
}
