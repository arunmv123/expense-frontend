import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseContext from "../../context/ExpenseContext";

const ExpenseList = () => {
  const { expenses } = useContext(ExpenseContext);

  return (
    <div>
      <h2>All Expenses</h2>
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
