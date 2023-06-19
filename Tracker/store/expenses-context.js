import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "SET":
      return action.payload;
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
  const [state, dispatch] = useReducer(reducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function setExpense(expenseData) {
    dispatch({ type: "SET", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: state,
    setExpense: setExpense,
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
