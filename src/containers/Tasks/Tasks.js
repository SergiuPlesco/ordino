import React, { useState, useEffect } from "react";
import TasksList from "@/components/TasksList/TasksList";
import useLocalStorage from "@/hooks/useLocalStorage";
import generateId from "@/utils/generateId";

const Tasks = () => {
  const { allTasks, setAllTasks, setIsSaving } = useLocalStorage();
  const [list, setList] = useState([]);

  const updateTask = (id, value) => {
    setIsSaving(true);
    setAllTasks((currentList) => [
      ...currentList.map((item) =>
        item.id === id ? { ...item, value, isNew: false } : item
      ),
    ]);
  };

  const addListItem = () => {
    setAllTasks((currentList) => [
      ...currentList.map((item) => ({ ...item, isNew: false })),
      {
        id: generateId(),
        value: "",
        isNew: true,
      },
    ]);
  };

  const removeTask = (id) => {
    setIsSaving(true);
    setAllTasks((currentList) => currentList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (allTasks) {
      setList(allTasks);
    }
  }, [allTasks]);
  return (
    <>
      <button onClick={addListItem}>+ list item</button>

      <TasksList
        allTasks={list}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </>
  );
};

export default Tasks;
