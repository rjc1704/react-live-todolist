import checkIcon from "../../assets/icons/check.svg";
import xIcon from "../../assets/icons/X.svg";
import Button from "../Button/Button";
import styles from "./ActionButtons.module.css";

export default function ActionButtons({ isDirty, onSubmit, onDelete }) {
  return (
    <div className={styles.actions}>
      <Button
        variant={isDirty ? "success" : "default"}
        shape="pill"
        iconSrc={checkIcon}
        onClick={onSubmit}
      >
        수정 완료
      </Button>
      <Button
        variant="danger"
        shape="pill"
        iconSrc={xIcon}
        onClick={onDelete}
      >
        삭제하기
      </Button>
    </div>
  );
}
