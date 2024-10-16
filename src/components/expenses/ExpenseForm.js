import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExpenseContext from "../../context/ExpenseContext";

const ExpenseForm = () => {
  const { addExpense, updateExpense, expenses } = useContext(ExpenseContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const expense = expenses.find((exp) => exp._id === id);
      if (expense) {
        setTitle(expense.title);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(expense.date);
      }
    }
  }, [id, expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { title, amount, category, date };
    if (id) {
      updateExpense(id, newExpense);
    } else {
      addExpense(newExpense);
    }
    navigate.push("/expenses");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Expense" : "Add Expense"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">{id ? "Update Expense" : "Add Expense"}</button>
    </form>
  );
};

export default ExpenseForm;
