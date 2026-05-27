import styles from "./TodoSection.module.css";
import todoIcon from "../../assets/imgs/todo.svg";
import CheckList from "../CheckList/CheckList";
import { useMediaQuery } from "react-responsive";
import todoEmptySm from "../../assets/imgs/todo-sm.svg";
import todoEmptyLg from "../../assets/imgs/todo-lg.svg";
import doneIcon from "../../assets/imgs/done.svg";
import doneEmptySm from "../../assets/imgs/done-sm.svg";
import doneEmptyLg from "../../assets/imgs/done-lg.svg";

export default function TodoSection({ todos, handleToggle, isDone }) {
  const isMobile = useMediaQuery({ maxWidth: 743 });
  return (
    <section className={styles.section}>
      <h2>
        <img
          src={isDone ? doneIcon : todoIcon}
          alt={isDone ? "DONE" : "TODO"}
        />
      </h2>
      {todos.length === 0 ? (
        <div className={styles.empty}>
          <img
            src={
              isMobile
                ? isDone
                  ? doneEmptySm
                  : todoEmptySm
                : isDone
                  ? doneEmptyLg
                  : todoEmptyLg
            }
            alt=""
          />
          <p className={styles.emptyText}>
            할 일이 없어요.
            <br />
            TODO를 새롭게 추가해주세요!
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {todos.map((item) => (
            <li key={item.id}>
              <CheckList
                id={item.id}
                name={item.name}
                isCompleted={item.isCompleted}
                onToggle={handleToggle}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
