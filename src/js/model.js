import { getJSON } from "./helpers.js";
import { API_URL } from "./config.js";

export const state = {
  recipe: {}
}

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`) ;        
    const { recipe } = data.data;    
    state.recipe = {
      sourceUrl: recipe.source_url,
      id: recipe.id,
      ingredients: recipe.ingredients,
      imageUrl: recipe.image_url,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      title: recipe.title,
      servings: recipe.servings
    }    
  } catch (err) {
    console.log(err)
  }
} 