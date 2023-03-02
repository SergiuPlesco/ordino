import React from "react";

import ListItem from "../ListItem/ListItem";

const TasksList = ({ allTasks = [], removeTask, updateTask }) => {
  return (
    <ul>
      {allTasks.map((task) => {
        return (
          <div key={task.id}>
            <ListItem
              task={task}
              removeTask={removeTask}
              updateTask={updateTask}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default TasksList;
