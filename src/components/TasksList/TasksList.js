import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import ListItem from "../ListItem/ListItem";

const TasksList = () => {
	console.log("render taskslist");

	const [allTasks, setValue, isSaving] = useLocalStorage();
	const [list, setList] = useState([]);
	console.log(isSaving);
	useEffect(() => {
		if (allTasks) {
			setList(allTasks);
		}
	}, [isSaving]);

	return (
		<ul>
			{list.map((task, index) => {
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
