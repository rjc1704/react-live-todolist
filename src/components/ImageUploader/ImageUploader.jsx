import { useRef } from "react";
import imgMark from "../../assets/imgs/img-mark.svg";
import plusIcon from "../../assets/icons/plus.svg";
import checkIcon from "../../assets/icons/check.svg";
import Button from "../Button/Button";
import { uploadImage } from "../../lib/api";
import styles from "./ImageUploader.module.css";

export default function ImageUploader({ imageUrl, onChange }) {
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지는 5MB 이하만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }
    if (!/^[A-Za-z0-9._-]+$/.test(file.name)) {
      alert("파일 이름은 영문, 숫자, 마침표(.), 하이픈(-), 언더스코어(_)만 가능합니다.");
      e.target.value = "";
      return;
    }
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (err) {
      console.error(err);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className={styles.wrapper}>
      {imageUrl ? (
        <img className={styles.preview} src={imageUrl} alt="투두 이미지" />
      ) : (
        <div className={styles.placeholder}>
          <img src={imgMark} alt="" />
        </div>
      )}
      <Button
        variant={imageUrl ? "dark" : "default"}
        shape="round"
        size="lg"
        iconSrc={imageUrl ? checkIcon : plusIcon}
        onClick={handleClick}
        aria-label="이미지 업로드"
        className={styles.uploadButton}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={handleFile}
      />
    </div>
  );
}
