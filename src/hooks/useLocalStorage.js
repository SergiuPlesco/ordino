import React, { useState, useEffect } from "react";

const useLocalStorage = () => {
	const [value, setValue] = useState([]);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		console.log("effect get item");
		const savedTasks = JSON.parse(localStorage.getItem("tasks"));
		if (savedTasks) {
			setValue(savedTasks);
		}
	}, []);

	useEffect(() => {
		if (isSaving) {
			console.log("effect set item");
			localStorage.setItem("tasks", JSON.stringify(value));
			setIsSaving(false);
		}
	}, [isSaving]);

	return [value, setValue, isSaving, setIsSaving];
};

export default useLocalStorage;
