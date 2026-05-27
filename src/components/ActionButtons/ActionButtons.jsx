import checkIcon from "../../assets/icons/check.svg";
import xIcon from "../../assets/icons/X.svg";
import styles from "./ActionButtons.module.css";

export default function ActionButtons({ onSubmit, onDelete }) {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={`${styles.button} ${styles.submit}`}
        onClick={onSubmit}
      >
        <img src={checkIcon} alt="" />
        <span>수정 완료</span>
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.delete}`}
        onClick={onDelete}
      >
        <img src={xIcon} alt="" />
        <span>삭제하기</span>
      </button>
    </div>
  );
}
