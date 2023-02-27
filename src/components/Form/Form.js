import React, { useState, useEffect } from "react";

const Form = ({ saveTask }) => {
	const [value, setValue] = useState("");

	const handleSaving = () => {
		saveTask();
		setValue("");
	};

	return (
		<form>
			<input type="text" name="task" value={value} onChange={(e) => setValue(e.target.value)} />
			<button type="submit" onClick={handleSaving}>
				add
			</button>
		</form>
	);
};

export default Form;
