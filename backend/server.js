const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || "mongodb://mongodb:27017/recipedb";
mongoose
    .connect("mongodb://mongodb:27017/taskdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.get("/api/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);
    } catch (err) {
        console.error("GET /api/recipes error:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post("/api/recipes", async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;

        const recipe = new Recipe({
            name,
            ingredients,
            instructions,
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        console.error("POST /api/recipes error:", err);
        res.status(400).json({ error: "Impossible de créer la recette" });
    }
});

app.put("/api/recipes/:id", async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;

        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { name, ingredients, instructions },
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({ error: "Recette non trouvée" });
        }

        res.json(recipe);
    } catch (err) {
        console.error("PUT /api/recipes/:id error:", err);
        res.status(400).json({ error: "Erreur lors de la mise à jour" });
    }
});

app.delete("/api/recipes/:id", async (req, res) => {
    try {
        const deleted = await Recipe.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Recette non trouvée" });
        }

        res.json({ message: "Recette supprimée" });
    } catch (err) {
        console.error("DELETE /api/recipes/:id error:", err);
        res.status(400).json({ error: "Erreur lors de la suppression" });
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Backend running on port ${port}`);
});
