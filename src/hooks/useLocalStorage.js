import { useState, useEffect } from "react";

const useLocalStorage = () => {
	const [value, setValue] = useState([]);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const currentValue = JSON.parse(localStorage.getItem("tasks"));
		if (currentValue) {
			setValue(currentValue);
		}
	}, []);

	useEffect(() => {
		if (isSaving) {
			localStorage.setItem("tasks", JSON.stringify(value));
			setIsSaving(false);
		}
	}, [isSaving]);

	return { value, setValue, isSaving, setIsSaving };
};

export default useLocalStorage;
