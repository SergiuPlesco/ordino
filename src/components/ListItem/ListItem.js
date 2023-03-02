import React, { useState } from "react";
import Form from "../Form/Form";

const ListItem = ({ task, updateTask, removeTask }) => {
  const [isDeviding, setIsDeviding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <li
        style={{
          display: "flex",
        }}
      >
        {task.isNew || isEditing ? (
          <Form
            task={task}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateTask={updateTask}
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            style={{
              width: "200px",
            }}
          >
            {task.value}
          </p>
        )}
        {!isDeviding && (
          <button onClick={() => setIsDeviding(true)}>devide </button>
        )}
        {!isDeviding && (
          <button onClick={() => removeTask(task.id)}>delete </button>
        )}
        {isDeviding && (
          <button onClick={() => setIsDeviding(false)}>cancel</button>
        )}
      </li>
      {/* {isDeviding && <Form addTask={addTask} />} */}
    </>
  );
};

export default ListItem;
