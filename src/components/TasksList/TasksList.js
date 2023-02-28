import React from "react";

import ListItem from "../ListItem/ListItem";

const TasksList = ({ allTasks = [] }) => {
  return (
    <ul>
      {allTasks.map((task, index) => {
        return (
          <div key={index}>
            <ListItem task={task} />
          </div>
        );
      })}
    </ul>
  );
};

export default TasksList;
