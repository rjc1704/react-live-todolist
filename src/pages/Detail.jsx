import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import TitleBar from "../components/TitleBar/TitleBar";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import MemoBox from "../components/MemoBox/MemoBox";
import ActionButtons from "../components/ActionButtons/ActionButtons";
import { deleteItem, getItem, updateItem } from "../lib/api";
import styles from "./Detail.module.css";

const compareFields = (a, b) =>
  a.name === b.name &&
  (a.memo || "") === (b.memo || "") &&
  (a.imageUrl || "") === (b.imageUrl || "") &&
  a.isCompleted === b.isCompleted;

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const initialRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getItem(id);
        setItem(data);
        initialRef.current = data;
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!item) return null;

  const setField = (key, value) => setItem({ ...item, [key]: value });

  const isDirty = initialRef.current
    ? !compareFields(item, initialRef.current)
    : false;

  const handleSubmit = async () => {
    try {
      await updateItem(id, {
        name: item.name,
        memo: item.memo || "",
        imageUrl: item.imageUrl || "",
        isCompleted: item.isCompleted,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className={styles.detail}>
      <TitleBar
        name={item.name}
        isCompleted={item.isCompleted}
        onNameChange={(name) => setField("name", name)}
        onToggle={() => setField("isCompleted", !item.isCompleted)}
      />

      <div className={styles.row}>
        <ImageUploader
          imageUrl={item.imageUrl}
          onChange={(url) => setField("imageUrl", url)}
        />
        <MemoBox value={item.memo} onChange={(memo) => setField("memo", memo)} />
      </div>

      <ActionButtons
        isDirty={isDirty}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}
