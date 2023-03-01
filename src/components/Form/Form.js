import React, { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Form = ({ addTask }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(value);
    setValue("");
  };

  return (
    <form>
      <input
        type="text"
        name="task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        add
      </button>
    </form>
  );
};

export default Form;
