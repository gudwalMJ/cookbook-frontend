import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get(`/recipes/${id}`);
        const recipe = response.data;
        setTitle(recipe.title);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setPreparationSteps(recipe.preparationSteps);
        setImageUrls(recipe.imageUrls);
        setServings(recipe.servings);
        setDifficulty(recipe.difficulty);
        setPreparationTime(recipe.preparationTime);
        setCategories(recipe.categories);
      } catch (error) {
        console.error("Error fetching recipe:", error.response.data.error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/recipes/${id}`,
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
      alert("Recipe updated successfully");
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error.response.data.error);
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
    <div className="edit-recipe">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleUpdateRecipe}>
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
                checked={categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
        <button type="submit">Update Recipe</button>
        <button type="button" onClick={() => navigate(`/recipes/${id}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
