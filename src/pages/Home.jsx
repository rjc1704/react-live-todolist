import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Search from "../components/Search/Search";
import CheckList from "../components/CheckList/CheckList";
import { createItem, getItems, updateItem } from "../lib/api";
import todoEmptyLg from "../assets/imgs/todo-lg.svg";
import todoEmptySm from "../assets/imgs/todo-sm.svg";
import doneEmptyLg from "../assets/imgs/done-lg.svg";
import doneEmptySm from "../assets/imgs/done-sm.svg";
import styles from "./Home.module.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 743 });

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadItems();
  }, []);

  const handleAdd = async (name) => {
    try {
      const newItem = await createItem(name);
      setItems((prev) => [...prev, newItem]);
      setInputValue("");
    } catch (err) {
      console.error(err);
      alert("추가에 실패했습니다.");
    }
  };

  const handleToggle = async (id, isCompleted) => {
    try {
      const updated = await updateItem(id, { isCompleted });
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item)),
      );
    } catch (err) {
      console.error(err);
      alert("변경에 실패했습니다.");
    }
  };

  const todos = items.filter((item) => !item.isCompleted);
  const dones = items.filter((item) => item.isCompleted);

  return (
    <div className={styles.home}>
      <Search value={inputValue} onChange={setInputValue} onAdd={handleAdd} />

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={`${styles.label} ${styles.todoLabel}`}>TO DO</h2>
          {todos.length === 0 ? (
            <div className={styles.empty}>
              <img src={isMobile ? todoEmptySm : todoEmptyLg} alt="" />
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

        <section className={styles.section}>
          <h2 className={`${styles.label} ${styles.doneLabel}`}>DONE</h2>
          {dones.length === 0 ? (
            <div className={styles.empty}>
              <img src={isMobile ? doneEmptySm : doneEmptyLg} alt="" />
              <p className={styles.emptyText}>
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </p>
            </div>
          ) : (
            <ul className={styles.list}>
              {dones.map((item) => (
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
      </div>
    </div>
  );
}
