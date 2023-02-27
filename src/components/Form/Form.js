import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Form = () => {
	const [allTasks, setAllTasks, , setIsSaving] = useLocalStorage();
	const [value, setValue] = useState("");

	const saveTask = (e) => {
		e.preventDefault();
		setIsSaving(true);
		setAllTasks([...allTasks, value]);
		setValue("");
	};

	return (
		<form>
			<input type="text" name="task" value={value} onChange={(e) => setValue(e.target.value)} />
			<button type="submit" onClick={saveTask}>
				add
			</button>
		</form>
	);
};

export default Form;
