import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../axiosConfig";
import AuthContext from "./AuthContext";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (auth) {
      fetchExpenses();
    }
  }, [auth]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async (expense) => {
    try {
      const res = await axios.post("/api/expenses", expense);
      setExpenses([...expenses, res.data]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const res = await axios.put(`/api/expenses/${id}`, updatedExpense);
      setExpenses(expenses.map((exp) => (exp._id === id ? res.data : exp)));
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
