import styles from "./MemoBox.module.css";

export default function MemoBox({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.label}>Memo</h3>
      <textarea
        className={styles.textarea}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="메모를 입력하세요"
      />
    </div>
  );
}
