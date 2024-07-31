import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchMovie.module.css";

export default function SearchMovie({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      toast.error("There is no movies with this name.");
      return;
    }

    onSubmit(inputValue);
    setInputValue("");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Movie to search..."
        />
        <button type="submit" className={styles.button}>
          Search movie
        </button>
      </form>
      <Toaster />
    </div>
  );
}
