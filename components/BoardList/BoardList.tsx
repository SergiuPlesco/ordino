"use client";
import React from "react";
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
const todos = [
  {
    id: 1,
    name: "Buy milk",
  },
  {
    id: 2,
    name: "Drink water",
  },
  {
    id: 3,
    name: "Eat food",
  },
  {
    id: 4,
    name: "Go out",
  },
];

type Todo = {
  id: number;
  name: string;
};
type Person = {
  firstName: string;
  todos: Todo[];
};

const TodoList = () => {
  const formFactory = createFormFactory<Person>({
    defaultValues: {
      firstName: "Sergiu",
      todos: todos,
    },
  });

  const [state, action] = useFormState<any, Person>(() => {},
  formFactory.initialFormState);

  const { Provider, Field, handleSubmit, Subscribe, useStore } =
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
              name="todos"
              mode="array"
              children={(todoField) => {
                console.log(todoField.state.value);
                return (
                  <>
                    <div className="flex flex-col gap-6">
                      <div>
                        <Button
                          type="button"
                          onClick={() => {
                            todoField.pushValue({
                              id: todoField.state.value.length + 1,
                              name: "",
                            });
                          }}
                        >
                          Create new board
                        </Button>
                      </div>
                      {todoField.state.value.map((board, i) => {
                        return (
                          <div key={board.id}>
                            <todoField.Field
                              // @ts-ignore
                              index={i}
                              // @ts-ignore
                              name="name"
                              children={(field) => {
                                return (
                                  <div className="flex flex-col gap-2">
                                    <Label htmlFor={field.name}>
                                      {field.name}:{" "}
                                    </Label>
                                    <div className="flex gap-2">
                                      <p>{i + 1}</p>
                                      <Input
                                        id={field.name}
                                        name={field.name}
                                        // @ts-ignore
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        className="border rounded"
                                      />
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="pointer-grab"
                                      >
                                        <GripVerticalIcon />
                                      </Button>
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => todoField.removeValue(i)}
                                      >
                                        <Trash2Icon />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              }}
                            />
                          </div>
                        );
                      })}
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
