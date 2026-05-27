import checkedIcon from "../../assets/icons/todo-check-true.svg";
import uncheckedIcon from "../../assets/icons/todo-check-false.svg";
import styles from "./TitleBar.module.css";

export default function TitleBar({ name, isCompleted, onNameChange, onToggle }) {
  return (
    <div
      className={`${styles.titleBar} ${isCompleted ? styles.checked : ""}`}
    >
      <button
        type="button"
        className={styles.checkbox}
        onClick={onToggle}
        aria-label="완료 여부"
      >
        <img src={isCompleted ? checkedIcon : uncheckedIcon} alt="" />
      </button>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
    </div>
  );
}
