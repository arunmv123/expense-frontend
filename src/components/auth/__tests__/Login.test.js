import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthContext";
import Login from "../Login";

test("renders login form", () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
