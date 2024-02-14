export type Board = {
  id: number;
  name: string;
  tasks: Task[];
};
export type Task = {
  id: number;
  value: string;
  tasks: Task[];
};

export type Person = {
  firstName: string;
  boards: Board[];
};
