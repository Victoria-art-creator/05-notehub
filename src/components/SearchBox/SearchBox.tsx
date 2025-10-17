import css from "./SearchBox.module.css";
import { type ChangeEvent, useState } from "react";

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
}
