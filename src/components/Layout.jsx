import { Outlet } from "react-router";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
