import { getJSON } from "./helpers.js";
import { API_URL, RESULTS_PER_PAGE} from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE
  },
  bookmarks: []
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

  //Identify if the current recipe is part of the bookmarked list, if yes, change bookmarked proeprty to true
  state.bookmarks.some(el=> el.id === id) ? state.recipe.bookmarked = true : state.recipe.bookmarked = false;
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
    state.search.currentPage = 1;
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

export const updateQuantityForServings = function(newServings){
  state.recipe.ingredients.forEach(el => el.quantity = el.quantity * newServings/state.recipe.servings)
  state.recipe.servings = newServings;
}


export const addBookmarks = function(recipe){
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks)) 
}

export const deleteBookmarks = function(id){
    const bIndex = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(bIndex, 1) 
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}


export const restoreBookmarks = function(){
  const storedBookmarks =  JSON.parse(localStorage.getItem('bookmarks'))
  if(storedBookmarks) state.bookmarks = storedBookmarks;
  console.log(storedBookmarks)
}

export const clearBookmarks = function(){
  localStorage.clear('bookmarks')
}

/*
Crate a function in model to bookmark the input array

The bookmarked array is pushed to the bookmarks array in state

If the recipee id of the current loaded recipee is the same as the current bookmarked id in this function, we need to set the bookmarked property of the recipe in the state object as true

Use this functon to create an addbookmark controller function in controller

Add handler function in View to add bookmkark through button.

identify if the current recipe is a bookarked recipe, if yes, mark it as a bookmarked in model

Change the bookarked icon for bookmarked recipes in the above case

Add in a function to delte the bookmark in model and use the same in controller
*/