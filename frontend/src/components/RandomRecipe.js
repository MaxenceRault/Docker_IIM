import { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api/recipes";

function RandomRecipe() {
  const [recipe, setRecipe] = useState(null);

  const fetchRandomRecipe = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.length === 0) {
      setRecipe(null);
      return;
    }

    const random = data[Math.floor(Math.random() * data.length)];
    setRecipe(random);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  return (
    <div className="container">
      <h1>Recette Aléatoire</h1>

      <button onClick={fetchRandomRecipe} className="btn-random">
        Nouvelle Recette
      </button>

      {!recipe ? (
        <p>Aucune recette disponible.</p>
      ) : (
        <div className="recipe-item">
          <h2>{recipe.name}</h2>
          <p>
            <b>Ingrédients :</b> {recipe.ingredients.join(", ")}
          </p>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
}

export default RandomRecipe;
