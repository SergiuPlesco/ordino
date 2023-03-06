import React, { useState, useEffect } from "react";
import BoardItem from "@/containers/BoardItem/BoardItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import generateId from "@/utils/generateId";

const Board = () => {
	const { value, setValue, setIsSaving } = useLocalStorage();
	const [list, setList] = useState({});

	const updateTask = (id, value) => {
		setIsSaving(true);
		setValue((currentValue) => {
			// return setItemValue(currentValue, id, value);
			return [
				...currentValue.steps.map((item) =>
					item.id === id ? { ...item, value, isNew: false } : item
				),
			];
		});
	};

	const setItemValue = (list, id, value) => {
		return list.map((item) => {
			if (item.id === id) {
				console.log(id);
				return {
					...item,
					value,
					isNew: false,
				};
			} else if (item.hasOwnProperty("steps")) {
				return setItemValue(item.steps, item.id, value);
			} else {
				return item;
			}
		});
	};

	// to do: update state for nested level
	// use recursive function

	// function that takes an object and setState as arguments,
	// loops through object if a property is an array it loops looking for the object with
	// provided id to update its value property and calls itself every time it finds an array

	const addListItem = () => {
		setIsSaving(true);
		setValue((currentValue) => ({
			...currentValue,
			steps: currentValue.steps
				? [
						...currentValue.steps.map((step) => ({ ...step, isNew: false })),
						{
							id: generateId(),
							value: "",
							isNew: true,
						},
				  ]
				: [
						{
							id: generateId(),
							value: "",
							isNew: true,
						},
				  ],
		}));
	};

	const addListToItem = (task) => {
		setValue((currentList) => [
			...currentList.map((item) =>
				item.id === task.id
					? {
							...item,
							steps: task.steps
								? [
										...task.steps.map((step) => ({ ...step, isNew: false })),
										{
											id: generateId(),
											value: "",
											isNew: true,
										},
								  ]
								: [
										{
											id: generateId(),
											value: "",
											isNew: true,
										},
								  ],
					  }
					: item
			),
		]);
	};
	// bug: if input is focused and removeTask is called.
	// the handleBlur is called and saves the current state to local storages
	// to do: remove the item no matter what
	const removeTask = (id) => {
		setIsSaving(true);
		setValue((currentList) => {
			return currentList.filter((item) => item.id !== id);
		});
	};

	useEffect(() => {
		if (value) {
			setList(value);
		}
	}, [value]);
	return (
		<>
			<button onClick={addListItem}>+ list item</button>
			{/* an array with BoardItems */}
			<BoardItem
				// should get his object from store?
				list={value.steps}
				removeTask={removeTask}
				updateTask={updateTask}
				addListToItem={addListToItem}
			/>
		</>
	);
};

export default Board;
