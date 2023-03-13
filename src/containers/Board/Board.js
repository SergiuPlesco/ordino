import React, { useState, useEffect } from "react";
import BoardItem from "@/containers/BoardItem/BoardItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import generateId from "@/utils/generateId";
import Button from "@/components/Button/Button";

const Board = () => {
  const { value, setValue, setIsSaving } = useLocalStorage();
  const [board, setBoard] = useState([]);

  const saveBoardTitle = (id, value) => {
    setIsSaving(true);
    setValue((currentValue) => {
      return [
        ...currentValue.map((item) =>
          item.id === id ? { ...item, title: value, isNew: false } : item
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

  const addBoardItem = () => {
    setIsSaving(true);
    setValue((currentValue) => [
      ...currentValue.map((oldItem) => ({ ...oldItem, isNew: false })),
      {
        id: generateId(),
        title: "",
        isNew: true,
        steps: [],
      },
    ]);
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
  // bug: when input is focused and addBoardItem and removeBoardItem are called
  // the handleBlur is fires before and saves the current state to local storages
  // to do: remove or add an item to localStorage when input is focused
  // could hanleBlur be buggy
  //   or logic add and remove with handleBlur?
  const removeBoardItem = (id) => () => {
    setIsSaving(true);
    setValue((currentList) => {
      return currentList.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    if (value) {
      setBoard(value);
    }
  }, [value]);

  return (
    <>
      <Button onClick={addBoardItem}>+ Board Item</Button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: "1rem",
          rowGap: "1rem",
          padding: "1rem",
        }}
      >
        {board.map((item) => (
          <BoardItem
            key={item.id}
            item={item}
            saveBoardTitle={saveBoardTitle}
            removeBoardItem={removeBoardItem}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
