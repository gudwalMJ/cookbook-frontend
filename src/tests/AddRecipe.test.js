// src/tests/AddRecipe.test.js

// Mock axios at the top of the file
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

import axios from "axios"; // Import axios after mocking
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"; // Import waitFor
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AddRecipe from "../components/recipes/addRecipe/AddRecipe";

// Mock useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock window.alert
window.alert = jest.fn(); // Mock window.alert at the top

describe("AddRecipe Component", () => {
  const fetchRecipesMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders AddRecipe form elements", () => {
    render(
      <BrowserRouter>
        <AddRecipe fetchRecipes={fetchRecipesMock} />
      </BrowserRouter>
    );

    // Check if all necessary elements are rendered
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Step/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Image/i)).toBeInTheDocument();

    // Check if the "Add Recipe" button is present
    const addRecipeButton = screen.getByRole("button", { name: /Add Recipe/i });
    expect(addRecipeButton).toBeInTheDocument();
  });

  test('adds a new ingredient field when "Add Ingredient" button is clicked', () => {
    render(
      <BrowserRouter>
        <AddRecipe fetchRecipes={fetchRecipesMock} />
      </BrowserRouter>
    );

    // Click "Add Ingredient" button and verify new ingredient input is added
    const addButton = screen.getByText(/Add Ingredient/i);
    fireEvent.click(addButton);

    expect(screen.getAllByPlaceholderText(/Name/i).length).toBe(2); // Initially 1 ingredient field, after click should be 2
  });

  test("submits form with correct data", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "Recipe added successfully" },
    });

    render(
      <BrowserRouter>
        <AddRecipe fetchRecipes={fetchRecipesMock} />
      </BrowserRouter>
    );

    // Fill out form fields
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: "New Recipe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "Delicious and easy to make." },
    });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Flour" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Quantity/i), {
      target: { value: "200g" },
    });

    // Click the "Add Recipe" button to submit
    fireEvent.click(screen.getByRole("button", { name: /Add Recipe/i }));

    // Use waitFor to handle asynchronous axios call
    await waitFor(() => {
      // Check if axios.post was called with correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        "/api/recipes",
        expect.objectContaining({
          title: "New Recipe",
          description: "Delicious and easy to make.",
          ingredients: [{ name: "Flour", quantity: "200g" }],
        }),
        expect.any(Object)
      );

      // Ensure fetchRecipesMock was called after form submission
      expect(fetchRecipesMock).toHaveBeenCalled();
    });
  });

  test("displays an alert on API error", async () => {
    // Ensure axios.post is mocked to reject with an error
    axios.post.mockRejectedValueOnce(new Error("API Error"));

    render(
      <BrowserRouter>
        <AddRecipe fetchRecipes={fetchRecipesMock} />
      </BrowserRouter>
    );

    // Fill out form fields to trigger submission
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: "Error Recipe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "This will fail." },
    });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Sugar" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Quantity/i), {
      target: { value: "100g" },
    });

    // Trigger form submission
    fireEvent.click(screen.getByRole("button", { name: /Add Recipe/i }));

    // Wait for the alert to be called due to the rejection
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Error adding recipe: API Error"
      );
    });
  });
});
q;
