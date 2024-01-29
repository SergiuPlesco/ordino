import {
  useForm,
  createFormFactory,
  FormApi,
  mergeForm,
  useTransform,
} from "@tanstack/react-form";
const boards = [
  {
    id: 1,
    name: "Buy Volvo V90",
  },
  {
    id: 2,
    name: "Buy house",
  },
  {
    id: 3,
    name: "Get girlfriend",
  },
  {
    id: 4,
    name: "Invest in real estate",
  },
];

export const formFactory = createFormFactory({
  defaultValues: {
    firstName: "Sergiu",
    boards: boards,
  },
});
