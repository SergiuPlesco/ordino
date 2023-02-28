import React, { useState, useEffect } from "react";
import Form from "@/components/Form/Form";
import TasksList from "@/components/TasksList/TasksList";
import useLocalStorage from "@/hooks/useLocalStorage";

const Tasks = () => {
	const { allTasks } = useLocalStorage();
	console.log("rendering home");
	const [list, setList] = useState([]);

	useEffect(() => {
		if (allTasks) {
			setList(allTasks);
		}
	}, [allTasks]);
	return (
		<>
			<Form />
			<TasksList allTasks={list} />
		</>
	);
};

export default Tasks;
