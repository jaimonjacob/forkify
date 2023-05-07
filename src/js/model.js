import { getJSON, sendJSON } from "./helpers.js";
import { API_URL, RESULTS_PER_PAGE, API_KEY} from "./config.js";

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

const returnRecipe = function(data){
  const { recipe } = data.data;
  return {
    sourceUrl: recipe.source_url,
    id: recipe.id,
    ingredients: recipe.ingredients,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    title: recipe.title,
    servings: recipe.servings,
    ...(recipe.key && {key: recipe.key})//short-circuiting to check if key is present and if yes, add property - HANDY
  }
}

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    state.recipe = returnRecipe(data)
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

export const uploadRecipe = async function(newRecipe){
  
  try{
    console.log(newRecipe)
    const ingredients =  Object.entries(newRecipe).filter(el=> el[0].startsWith('ingredient') && el[1])
    .map(el => {
      const [quantity, unit, description] = el[1].replaceAll(' ', '').split(',')
      return {quantity: quantity? +quantity: null, unit, description}
      
    });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients
    }
    console.log(recipe)
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe)
    state.recipe = returnRecipe(data)
    addBookmarks(state.recipe)
    console.log(state.recipe)
  } catch(err) {
    throw err
  }

}
