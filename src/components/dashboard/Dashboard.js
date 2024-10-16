import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import ExpenseContext from '../../context/ExpenseContext';

const Dashboard = () => {
  const { expenses } = useContext(ExpenseContext);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <Pie data={data} />
    </div>
  );
};

export default Dashboard;
