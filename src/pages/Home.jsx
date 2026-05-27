import { useEffect, useState } from "react";
import Search from "../components/Search/Search";
import CheckList from "../components/CheckList/CheckList";
import { createItem, getItems, updateItem } from "../lib/api";
import styles from "./Home.module.css";
import todoIcon from "../assets/imgs/todo.svg";
import doneIcon from "../assets/imgs/done.svg";

export default function Home() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
          <h2>
            <img src={todoIcon} alt="TODO" />
          </h2>
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
        </section>

        <section className={styles.section}>
          <h2>
            <img src={doneIcon} alt="DONE" />
          </h2>
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
        </section>
      </div>
    </div>
  );
}
