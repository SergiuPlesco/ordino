import React from "react";

import ListItem from "../ListItem/ListItem";

const TasksList = ({ allTasks = [], removeTask }) => {
  return (
    <ul>
      {allTasks.map((task) => {
        return (
          <div key={task.id}>
            <ListItem task={task} removeTask={removeTask} />
          </div>
        );
      })}
    </ul>
  );
};

export default TasksList;
