import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";
import logo from "../../assets/imgs/logo-lg.svg";
import logoMobile from "../../assets/imgs/logo-sm.svg";
import styles from "./GNB.module.css";

export default function GNB() {
  const isMobile = useMediaQuery({ maxWidth: 743 });

  return (
    <header className={styles.gnb}>
      <div className={styles.container}>
        <Link to="/">
          <img src={isMobile ? logoMobile : logo} alt="do it" />
        </Link>
      </div>
    </header>
  );
}
