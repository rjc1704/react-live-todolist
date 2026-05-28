import styles from "./GNB.module.css";
import logo from "../assets/imgs/logo-lg.svg";
import logoSm from "../assets/imgs/logo-sm.svg";
import { useMediaQuery } from "react-responsive";

export default function GNB() {
  const isMobile = useMediaQuery({ maxWidth: 743 });
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={isMobile ? logoSm : logo} alt="로고" />
      </div>
    </header>
  );
}
