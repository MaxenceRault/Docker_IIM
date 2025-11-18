import { useState, useEffect } from "react";

const API_URL = "http://localhost:5001/api/recipes";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  const fetchRecipes = async () => {
    const res = await fetch(API_URL);
    setRecipes(await res.json());
  };

  const addRecipe = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.ingredients.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        ingredients: form.ingredients.split(",").map((i) => i.trim()),
        instructions: form.instructions,
      }),
    });

    const newRecipe = await res.json();
    setRecipes([newRecipe, ...recipes]);

    setForm({ name: "", ingredients: "", instructions: "" });
  };

  const deleteRecipe = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setRecipes(recipes.filter((r) => r._id !== id));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1>🍽️ Gérer les Recettes</h1>

      <form onSubmit={addRecipe} className="recipe-form">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nom de la recette"
        />

        <input
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          placeholder="Ingrédients (séparés par ,)"
        />

        <textarea
          value={form.instructions}
          onChange={(e) =>
            setForm({ ...form, instructions: e.target.value })
          }
          placeholder="Instructions"
        />

        <button type="submit">➕ Ajouter une recette</button>
      </form>

      <h2>📃 Recettes enregistrées</h2>

      {recipes.map((r) => (
        <div key={r._id} className="recipe-item">
          <h3>{r.name}</h3>
          <p>
            <b>Ingrédients :</b> {r.ingredients.join(", ")}
          </p>
          <p>{r.instructions}</p>
          <button className="btn-delete" onClick={() => deleteRecipe(r._id)}>
            🗑 Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
