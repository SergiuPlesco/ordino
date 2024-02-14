import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon, Trash2Icon, Settings2Icon } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Label } from "@/components/ui/label";
import SortableItem from "../SortableItem";
import { Item } from "../Item";
import { useSearchParams } from "next/navigation";

import { Task, Board } from "@/types/types";

const BoardTasksContainer = ({
  boards,
}: {
  boardId: number | null;
  boards: Board[];
}) => {
  const searchParams = useSearchParams();
  const boardId = searchParams.get("boardId");
  const [items, setItems] = useState<Task[]>(() => {
    const board = boards.find((board: Board) => board.id === Number(boardId));
    if (board) {
      return board.tasks;
    } else {
      return [];
    }
  });
  const [activeId, setActiveId] = useState<any | null>(null);

  if (!Boolean(items.length)) {
    return null;
  }

  useEffect(() => {
    if (boardId) {
      const board = boards.find((board: Board) => board.id === Number(boardId));
      if (board) {
        setItems(() => board.tasks);
      }
    }
  }, [boardId]);

  return (
    <div className="h-[300px] w-[300px] border rounded-md p-2">
      <p className="text-center font-medium">board id: {boardId}</p>
      <DndContext
        id="tasks"
        onDragStart={(event) => {
          const { active } = event;
          console.log(active);
          if (activeId) {
            setActiveId(null);
          }

          setActiveId(() => active.id);
        }}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!active || !over) return;
          if (active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id);
              const newIndex = items.findIndex((item) => item.id === over.id);

              return arrayMove(items, oldIndex, newIndex);
            });
          }
          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext id="tasksItems" items={items}>
          {items &&
            items.map((task, index) => {
              return (
                <SortableItem
                  key={task.id}
                  id={task.id}
                  value={task.value}
                  index={index}
                />
              );
            })}
          <DragOverlay>
            {activeId ? (
              <Item
                id={activeId}
                value={
                  activeId
                    ? items.find((item) => item.id === activeId)?.value
                    : -1
                }
                index={items.findIndex((item) => item.id === activeId)}
                dragOverlay
              />
            ) : null}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default BoardTasksContainer;
