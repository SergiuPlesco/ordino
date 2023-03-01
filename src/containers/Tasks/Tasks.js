import React, { useState, useEffect } from "react";
import Form from "@/components/Form/Form";
import TasksList from "@/components/TasksList/TasksList";
import useLocalStorage from "@/hooks/useLocalStorage";
import generateId from "@/utils/generateId";

const Tasks = () => {
  const { allTasks, setAllTasks, setIsSaving } = useLocalStorage();
  const [list, setList] = useState([]);

  const addTask = (value) => {
    setIsSaving(true);
    setAllTasks((currentList) => [
      ...currentList,
      {
        id: generateId(),
        value,
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
      <Form addTask={addTask} />
      <TasksList allTasks={list} removeTask={removeTask} />
    </>
  );
};

export default Tasks;
