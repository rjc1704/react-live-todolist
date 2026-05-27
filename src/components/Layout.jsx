import { Outlet } from "react-router";
import styles from "./Layout.module.css";
import GNB from "./GNB";

export default function Layout() {
  return (
    <div>
      <main className={styles.main}>
        <GNB />
        <Outlet />
      </main>
    </div>
  );
}
