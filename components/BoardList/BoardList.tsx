"use client";
import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import BoardTasksContainer from "./BoardTasksContainer/BoardTasksContainer";
import generateId from "@/utils/generateId";
import { PERSON } from "../../constants/testData";
import { Person, Board } from "@/types/types";

const TodoList = () => {
  const formFactory = createFormFactory<Person>({
    defaultValues: PERSON,
  });
  const [items, setItems] = useState<Board[]>(PERSON.boards);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [state, action] = useFormState<any, Person>(() => {},
  formFactory.initialFormState);

  const searchParams = useSearchParams();
  const isBoardTaskContainerOpen = searchParams.has("showBoardTask");
  const boardId = searchParams.get("boardId");

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
                  <div className="flex flex-col gap-4">
                    <div>
                      <Button
                        type="button"
                        onClick={() => {
                          setItems((items) => [
                            ...items,
                            {
                              id: Number(items.slice(-1)[0].id + 1),
                              name: String(items.length + 1),
                              tasks: [],
                            },
                          ]);
                        }}
                      >
                        Create new board
                      </Button>
                    </div>
                    <div className="flex gap-4">
                      <DndContext
                        id="boards"
                        onDragStart={(event) => {
                          const { active } = event;
                          if (activeId) {
                            setActiveId(null);
                          }

                          setActiveId(() => active.id as number);
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
                        <div className="flex flex-col gap-6">
                          <SortableContext id="BoardsFolders" items={items}>
                            <div className="flex flex-col gap-2 w-[300px]">
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
                            <DragOverlay>
                              {activeId ? (
                                <Item
                                  id={activeId}
                                  value={
                                    activeId
                                      ? items.find(
                                          (item) => item.id === activeId
                                        )?.name
                                      : -1
                                  }
                                  index={items.findIndex(
                                    (item) => item.id === activeId
                                  )}
                                  dragOverlay
                                />
                              ) : null}
                            </DragOverlay>
                          </SortableContext>
                        </div>
                      </DndContext>
                      {isBoardTaskContainerOpen && boardId && (
                        <BoardTasksContainer
                          boardId={Number(boardId)}
                          boards={items}
                        />
                      )}
                    </div>
                  </div>
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
