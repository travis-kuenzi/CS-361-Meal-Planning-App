import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserRecipeSchema = new Schema({
    title: { type: String, required: true },
});

export default mongoose.model('UserRecipe', UserRecipeSchema);