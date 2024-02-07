"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  createFormFactory,
  FormApi,
  mergeForm,
  useTransform,
} from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
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
import SortableItem from "./SortableItem";
import { Item } from "./Item";
const Boards = [
  {
    id: 1,
    name: "Buy milk",
    tasks: [
      {
        id: 1,
        value: "Get dressed",
        subtasks: [
          {
            id: 1,
            value: "Take the clothes from wardrobe",
            subtasks: [
              {
                id: 1,
                value: "",
              },
            ],
          },
          { id: 2, value: "put the on", subtasks: [] },
        ],
      },
      { id: 2, value: "Go out" },
      { id: 3, value: "Get a bus to the supermarket" },
      { id: 4, value: "take the milk" },
      { id: 5, value: "pay for the milk" },
    ],
  },
  {
    id: 2,
    name: "Drink water",
    tasks: [],
  },
  {
    id: 3,
    name: "Eat food",
    tasks: [],
  },
  {
    id: 4,
    name: "Go out",
    tasks: [],
  },
];

type Board = {
  id: number;
  name: string;
  tasks: Tasks[];
};
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
type Person = {
  firstName: string;
  boards: Board[];
};

const TodoList = () => {
  const formFactory = createFormFactory<Person>({
    defaultValues: {
      firstName: "Sergiu",
      boards: Boards,
    },
  });
  const [items, setItems] = useState<Board[]>(Boards);
  const [activeId, setActiveId] = useState<any | null>(null);
  const [state, action] = useFormState<any, Person>(() => {},
  formFactory.initialFormState);

  const { Provider, Field, handleSubmit, Subscribe, setFieldValue } =
    formFactory.useForm({
      transform: useTransform(
        (baseForm: FormApi<any, any>) => mergeForm(baseForm, state),
        [state]
      ),
      onSubmit: async (values) => {
        console.log(values);
      },
    });

  return (
    <Provider>
      <form
        action={action as never}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void handleSubmit();
        }}
      >
        <div className="flex flex-col gap-6 border rounded p-4">
          <div>
            <Field
              name="firstName"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor="firstName">First Name: </Label>
                    <Input
                      id="firstName"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border rounded"
                    />
                  </>
                );
              }}
            />
          </div>
          <div>
            <Field
              name="boards"
              mode="array"
              children={(todoField) => {
                return (
                  <>
                    <div className="flex flex-col gap-6">
                      <div>
                        <Button
                          type="button"
                          onClick={() => {
                            setItems((items) => [
                              ...items,
                              {
                                id: items.length + 1,
                                name: String(items.length + 1),
                                tasks: [],
                              },
                            ]);
                          }}
                        >
                          Create new board
                        </Button>
                      </div>

                      <DndContext
                        id="boards"
                        onDragStart={(event) => {
                          const { active } = event;
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
                              const oldIndex = items.findIndex(
                                (item) => item.id === active.id
                              );
                              const newIndex = items.findIndex(
                                (item) => item.id === over.id
                              );

                              return arrayMove(items, oldIndex, newIndex);
                            });
                          }
                          setActiveId(null);
                        }}
                        onDragCancel={() => setActiveId(null)}
                      >
                        <SortableContext items={items}>
                          <div className="flex flex-col gap-2">
                            {items.map((item, i) => {
                              return (
                                <SortableItem
                                  key={item.id}
                                  id={item.id}
                                  todoField={todoField}
                                  value={item.name}
                                  index={i}
                                />
                              );
                            })}
                          </div>
                        </SortableContext>
                        <DragOverlay>
                          {activeId ? (
                            <Item
                              id={activeId}
                              value={
                                activeId
                                  ? items.find((item) => item.id === activeId)
                                      ?.name
                                  : -1
                              }
                              index={items.findIndex(
                                (item) => item.id === activeId
                              )}
                              dragOverlay
                            />
                          ) : null}
                        </DragOverlay>
                      </DndContext>
                    </div>
                  </>
                );
              }}
            />
          </div>
          <div>
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmittig]) => {
                return (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmittig ? "..." : "Submit"}
                  </Button>
                );
              }}
            />
          </div>
        </div>
      </form>
    </Provider>
  );
};

export default TodoList;
