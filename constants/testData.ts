import { Person } from "@/types/types";
export const PERSON: Person = {
  firstName: "John",
  boards: [
    {
      id: 1,
      name: "Car",
      tasks: [
        {
          id: 11,
          value: "Make money",
          tasks: [
            {
              id: 111,
              value: "$5000000",
              tasks: [],
            },
          ],
        },
        {
          id: 12,
          value: "Put aside",
          tasks: [
            {
              id: 121,
              value: "$5000000",
              tasks: [],
            },
          ],
        },
        {
          id: 13,
          value: "Choose what car",
          tasks: [
            {
              id: 131,
              value: "$5000000",
              tasks: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Board 2",
      tasks: [
        {
          id: 21,
          value: "Task 2",
          tasks: [
            {
              id: 211,
              value: "Subtask 2",
              tasks: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Board 3",
      tasks: [
        {
          id: 31,
          value: "Task 1",
          tasks: [
            {
              id: 311,
              value: "Subtask 1",
              tasks: [],
            },
          ],
        },
        {
          id: 32,
          value: "Task 2",
          tasks: [
            {
              id: 321,
              value: "Subtask 1",
              tasks: [],
            },
          ],
        },
        {
          id: 33,
          value: "Task 3",
          tasks: [
            {
              id: 331,
              value: "Subtask 1",
              tasks: [],
            },
          ],
        },
      ],
    },
  ],
};
