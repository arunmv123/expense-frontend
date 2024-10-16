import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseContext from "../../context/ExpenseContext";

const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate.push(`/expenses/${expense._id}/edit`);
  };

  return (
    <div>
      <h3>{expense.title}</h3>
      <p>
        {expense.amount} - {expense.category} - {expense.date}
      </p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => deleteExpense(expense._id)}>Delete</button>
    </div>
  );
};

export default ExpenseItem;
