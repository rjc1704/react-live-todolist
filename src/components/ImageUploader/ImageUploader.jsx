import { useRef } from "react";
import imgMark from "../../assets/imgs/img-mark.svg";
import plusIcon from "../../assets/icons/plus.svg";
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
      <button
        type="button"
        className={`${styles.button} ${imageUrl ? styles.edit : styles.add}`}
        onClick={handleClick}
        aria-label="이미지 업로드"
      >
        <img src={plusIcon} alt="" />
      </button>
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
