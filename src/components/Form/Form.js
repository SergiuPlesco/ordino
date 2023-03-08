import React, { useState, useRef, useEffect } from "react";

const Form = ({ item, saveBoardTitle, isEditing, setIsEditing }) => {
	const [value, setValue] = useState(item.title);
	const inputRef = useRef(null);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsEditing(false);
		saveBoardTitle(item.id, value);
	};

	const handleBlur = (e) => {
		e.preventDefault();
		setIsEditing(false);
		saveBoardTitle(item.id, value);
	};

	useEffect(() => {
		if (item.isNew) {
			inputRef.current.focus();
		}
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
			/>
			<button onClick={handleSubmit}>save</button>
		</>
	);
};

export default Form;
