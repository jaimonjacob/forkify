import { getJSON } from "./helpers.js";
import { API_URL, RESULTS_PER_PAGE} from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE
  }
}

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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
    throw err
  }
}

export const searchRecipe = async function (search) {
  try {
    const data = await getJSON(`${API_URL}?search=/${search}`);
    const { recipes } = data.data;
    state.search.query = search;
    state.search.results = recipes.map(el => {
      return {
        id: el.id,
        imageUrl: el.image_url,
        publisher: el.publisher,
        title: el.title,
      }
    });
  } catch (err) {
    throw err
  }
}

export const getSearchResultsforPage = function (currentPage = state.search.currentPage){
  const start = (currentPage - 1) * state.search.resultsPerPage;
  const end = currentPage * state.search.resultsPerPage;
  state.search.currentPage = currentPage;  
  return state.search.results.slice(start, end)
}