import React from "react";

import ListItem from "../ListItem/ListItem";

const TasksList = ({ list = [], removeTask, updateTask, addListToItem }) => {
	return (
		<ul>
			{list.map((task) => {
				console.log(task);
				return (
					<div key={task.id}>
						<ListItem
							task={task}
							removeTask={removeTask}
							updateTask={updateTask}
							addListToItem={addListToItem}
						/>
					</div>
				);
			})}
		</ul>
	);
};

export default TasksList;
