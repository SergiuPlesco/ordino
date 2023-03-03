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
    setIsSaving(true);
    setAllTasks((currentList) => [
      ...currentList.map((item) => ({ ...item, isNew: false })),
      {
        id: generateId(),
        value: "",
        isNew: true,
      },
    ]);
  };

  const addListToItem = (task) => {
    setAllTasks((currentList) => [
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
    setAllTasks((currentList) => {
      return currentList.filter((item) => item.id !== id);
    });
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
        list={list}
        removeTask={removeTask}
        updateTask={updateTask}
        addListToItem={addListToItem}
      />
    </>
  );
};

export default Tasks;
