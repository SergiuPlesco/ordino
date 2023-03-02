import React, { useState, useRef, useEffect } from "react";

const Form = ({ updateTask, task, isEditing, setIsEditing }) => {
  const [value, setValue] = useState(task.value);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, value);
    setIsEditing(false);
  };

  const handleBlur = (e) => {
    e.preventDefault();

    updateTask(task.id, e.target.value);
    setIsEditing(false);
  };
  useEffect(() => {
    if (task.isNew) {
      inputRef.current.focus();
    }
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <form>
      <input
        ref={inputRef}
        type="text"
        name="task"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          width: "200px",
        }}
      />
      <button type="submit" onClick={handleSubmit}>
        save
      </button>
    </form>
  );
};

export default Form;
