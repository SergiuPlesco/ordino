import React, { useState } from "react";
import Form from "../Form/Form";
import TasksList from "../../containers/BoardItem/BoardItem";

const BoardItem = ({ task, updateTask, removeTask, addListToItem }) => {
	const [isDeviding, setIsDeviding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleDevision = () => {
		setIsDeviding(true);
		addListToItem(task);
	};

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
				{!isDeviding && <button onClick={handleDevision}>devide </button>}
				{!isDeviding && <button onClick={() => removeTask(task.id)}>delete </button>}
				{isDeviding && <button onClick={() => setIsDeviding(false)}>cancel</button>}
			</li>
			{isDeviding && <TasksList list={task.steps} updateTask={updateTask} />}
		</>
	);
};

export default BoardItem;
