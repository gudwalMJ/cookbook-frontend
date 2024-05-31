import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./AddRecipe.css";

Modal.setAppElement("#root"); // For accessibility

const AddRecipe = ({ isModalOpen, closeModal, fetchRecipes }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [preparationSteps, setPreparationSteps] = useState([""]);
  const [imageUrls, setImageUrls] = useState([""]);
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [categories, setCategories] = useState([]);

  const categoryOptions = [
    "Breakfast",
    "Brunch",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Others",
  ];

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/recipes",
        {
          title,
          description,
          ingredients,
          preparationSteps,
          imageUrls,
          servings,
          difficulty,
          preparationTime,
          categories,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Recipe added successfully");
      closeModal();
      fetchRecipes();
    } catch (error) {
      console.error(
        "Error adding recipe:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...preparationSteps];
    newSteps[index] = value;
    setPreparationSteps(newSteps);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...imageUrls];
    newImages[index] = value;
    setImageUrls(newImages);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const addStep = () => {
    setPreparationSteps([...preparationSteps, ""]);
  };

  const addImage = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Add Recipe"
      className="modal"
      overlayClassName="overlay"
    >
      <form onSubmit={handleAddRecipe}>
        <h2>Add Recipe</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        <h3>Preparation Steps</h3>
        {preparationSteps.map((step, index) => (
          <textarea
            key={index}
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addStep}>
          Add Step
        </button>
        <h3>Images</h3>
        {imageUrls.map((url, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Image URL ${index + 1}`}
            value={url}
            onChange={(e) => handleImageChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addImage}>
          Add Image
        </button>
        <input
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preparation Time (minutes)"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
          required
        />
        <h3>Categories</h3>
        <div className="categories">
          {categoryOptions.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
        <button type="submit">Add Recipe</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddRecipe;
