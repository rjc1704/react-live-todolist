import styles from "./Home.module.css";
import todoTitleImg from "../assets/imgs/todo.svg";
import doneTitleImg from "../assets/imgs/done.svg";
import { useEffect, useState } from "react";
import CheckList from "../components/CheckList";
import { postTodo, updateTodo } from "../lib/api";

const TENANT_ID = "react-todo-live";
const BASE_URL = "https://assignment-todolist-api.vercel.app";

export default function Home() {
  const [todos, setTodos] = useState([]); // 상태를 정의했다 또는 Home 컴포너트가 상태를 가진다.
  const [title, setTitle] = useState("");

  const todoItems = todos.filter((todo) => todo.isCompleted === false);
  const doneItems = todos.filter((todo) => todo.isCompleted === true);

  const handleToggle = async (id, isCompleted) => {
    const updatedTodo = await updateTodo(id, { isCompleted: !isCompleted });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo,
      ),
    );
  };

  const handleAdd = async (e) => {
    e.preventDefault(); // 새로고침 방지
    //   서버에 POST 요청보내서
    const newTodo = await postTodo(title);

    setTodos([...todos, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    const fetchTodos = async () => {
      // 서버에서 todos 데이터 불러오기
      const response = await fetch(`${BASE_URL}/api/${TENANT_ID}/items`);
      if (!response.ok) {
        throw new Error("fetchTodos 실패");
      }
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.add} onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="할 일을 입력해주세요"
        />
        <button type="submit" className={styles.button}>
          +추가하기
        </button>
      </form>
      {/* TODO */}
      <div className={styles.sections}>
        <section>
          <h2>
            <img src={todoTitleImg} alt="Todo Section" />
          </h2>
          <ul className={styles.ul}>
            {todoItems.map((todo) => (
              <CheckList
                key={todo.id}
                isChecked={todo.isCompleted}
                onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                title={todo.name}
              />
            ))}
          </ul>
        </section>
        {/* DONE */}
        <section>
          <h2>
            <img src={doneTitleImg} alt="Todo Section" />
          </h2>
          <ul className={styles.ul}>
            {doneItems.map((todo) => (
              <CheckList
                key={todo.id}
                isChecked={todo.isCompleted}
                onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                title={todo.name}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
