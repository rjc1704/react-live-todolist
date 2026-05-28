import { Outlet } from "react-router";
import GNB from "./GNB";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div>
      <GNB />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
