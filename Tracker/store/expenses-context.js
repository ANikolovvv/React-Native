import { createContext, useReducer } from "react";

const EXPENSES_ARRAY = [
  {
    id: "e1",
    description: "water",
    amount: 30.96,
    date: new Date("2023-01-15"),
  },
  {
    id: "e2",
    description: "food",
    amount: 300.96,
    date: new Date("2023-02-28"),
  },
  {
    id: "e3",
    description: "shoes",
    amount: 130.96,
    date: new Date("2023-05-1"),
  },
  {
    id: "e4",
    description: "food",
    amount: 130.96,
    date: new Date("2023-05-1"),
  },
  {
    id: "e5",
    description: "new shoes ",
    amount: 130.96,
    date: new Date("2023-05-1"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const findIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const update = state[findIndex];
      const updateItem = { ...update, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[findIndex] = updateItem;
      return updateExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, EXPENSES_ARRAY);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: state,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
