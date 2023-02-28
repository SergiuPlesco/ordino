import React, { useState } from "react";
import Form from "../Form/Form";

const ListItem = ({ task, saveTask }) => {
  const [isDeviding, setIsDeviding] = useState(false);

  return (
    <>
      <li
        style={{
          display: "flex",
        }}
      >
        <p>{task}</p>
        <button onClick={() => setIsDeviding(true)}>devide task</button>
        {isDeviding && (
          <button onClick={() => setIsDeviding(false)}>cancel</button>
        )}
      </li>
      {isDeviding && <Form saveTask={saveTask} />}
    </>
  );
};

export default ListItem;
