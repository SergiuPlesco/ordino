import React from "react";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon, Trash2Icon, Settings2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
type Tasks = {
  id: number;
  value: string;
  subtasks?: Subtasks[];
};
type Subtasks = {
  id: number;
  value: string;
  subtasks?: Subtasks[];
};

const BoardTasksContainer = ({
  boardId,
  tasks,
}: {
  boardId: string | null;
  tasks?: Tasks[];
}) => {
  return (
    <div className="h-[300px] w-[300px] border rounded-md p-2">
      <p className="text-center font-medium">board id: {boardId}</p>
      {tasks &&
        tasks.map((task, index) => {
          return (
            <div key={task.id} className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="flex justify-center items-center gap-1"
              >
                <GripVerticalIcon className="w-4 h-4" />
                <Label className="font-bold leading-normal">{index + 1} </Label>
              </Button>
              <p className="leading-normal">{task.value}</p>
            </div>
          );
        })}
    </div>
  );
};

export default BoardTasksContainer;
