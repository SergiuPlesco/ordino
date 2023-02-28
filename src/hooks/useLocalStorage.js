import { useState, useEffect } from "react";

const useLocalStorage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log("effect get item");
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setAllTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (isSaving) {
      console.log("effect set item", allTasks);
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      setIsSaving(false);
    }
  }, [isSaving]);

  return { allTasks, setAllTasks, isSaving, setIsSaving };
};

export default useLocalStorage;
