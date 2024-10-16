import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseList from "./components/expenses/ExpenseList";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Routes>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/expenses/new" component={ExpenseForm} />
            <Route path="/expenses/:id/edit" component={ExpenseForm} />
            <Route path="/expenses" component={ExpenseList} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Login} />
          </Routes>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default App;
