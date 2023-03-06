import React, { useState, useRef, useEffect } from "react";

const Form = ({ updateTask, text, isEditing, setIsEditing }) => {
	const [value, setValue] = useState(text);
	const inputRef = useRef(null);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsEditing(false);
	};

	const handleBlur = (e) => {
		e.preventDefault();
		setIsEditing(false);
	};

	useEffect(() => {
		// if (task.isNew) {
		// 	inputRef.current.focus();
		// }
		if (isEditing) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	return (
		<>
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
			<button onClick={handleSubmit}>save</button>
		</>
	);
};

export default Form;
