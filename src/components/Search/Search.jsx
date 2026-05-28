import { useMediaQuery } from "react-responsive";
import plusIcon from "../../assets/icons/plus.svg";
import plusVacantIcon from "../../assets/icons/plus-vacant.svg";
import Button from "../Button/Button";
import styles from "./Search.module.css";

export default function Search({ value, onChange, onAdd }) {
  const isMobile = useMediaQuery({ maxWidth: 743 });
  const isEmpty = !value.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty) return;
    onAdd(value.trim());
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        type="submit"
        variant={isEmpty ? "default" : "primary"}
        shape={isMobile ? "round" : "pill"}
        iconSrc={isEmpty ? plusVacantIcon : plusIcon}
        disabled={isEmpty}
        aria-label="추가하기"
      >
        추가하기
      </Button>
    </form>
  );
}
