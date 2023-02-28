import React, { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Form = () => {
  const { setAllTasks, setIsSaving } = useLocalStorage();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setAllTasks((currentList) => [...currentList, value]);
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
