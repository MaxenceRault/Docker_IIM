import { useState } from "react";
import RecipeList from "./components/RecipeList";
import RandomRecipe from "./components/RandomRecipe";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => setPage("home")}>📚 Recettes</button>
        <button onClick={() => setPage("random")}>🎲 Recette aléatoire</button>
      </nav>

      {page === "home" ? <RecipeList /> : <RandomRecipe />}
    </div>
  );
}

export default App;
