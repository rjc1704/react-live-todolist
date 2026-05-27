import { useEffect, useState } from "react";
import Search from "../components/Search/Search";
import { createItem, getItems, updateItem } from "../lib/api";

import styles from "./Home.module.css";
import TodoSection from "../components/TodoSection/TodoSection";

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
        <TodoSection todos={todos} handleToggle={handleToggle} isDone={false} />
        <TodoSection todos={dones} handleToggle={handleToggle} isDone={true} />
      </div>
    </div>
  );
}
