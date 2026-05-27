import { Link } from "react-router";
import checkedIcon from "../../assets/icons/todo-check-true.svg";
import uncheckedIcon from "../../assets/icons/todo-check-false.svg";
import styles from "./CheckList.module.css";

export default function CheckList({ id, name, isCompleted, onToggle }) {
  const handleToggle = (e) => {
    e.preventDefault();
    onToggle(id, !isCompleted);
  };

  return (
    <Link
      to={`/${id}`}
      className={`${styles.item} ${isCompleted ? styles.checked : styles.unchecked}`}
    >
      <button
        type="button"
        className={styles.checkbox}
        onClick={handleToggle}
        aria-label="완료 여부"
      >
        <img src={isCompleted ? checkedIcon : uncheckedIcon} alt="" />
      </button>
      <p className={`${styles.name} ${isCompleted ? styles.lineThrough : ""}`}>
        {name}
      </p>
    </Link>
  );
}
