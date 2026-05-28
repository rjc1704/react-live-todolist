import styles from "./CheckList.module.css";
import unchecked from "../assets/icons/todo-check-false.svg";
import checked from "../assets/icons/todo-check-true.svg";

export default function CheckList({ title, isChecked, onToggle }) {
  return (
    <li className={styles.checkList}>
      <button className={styles.button} onClick={onToggle}>
        <img src={isChecked ? checked : unchecked} alt="checkbox" />
      </button>
      <p className={styles.title}>{title}</p>
    </li>
  );
}
