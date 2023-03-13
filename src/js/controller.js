import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//2fb8c90a-c94a-4485-ace1-394ebb44d609

//5ed6604591c37cdc054bc8fd
//5ed6604591c37cdc054bca5d

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;//guard close
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe)
  } catch (err) {
    console.error(err)
    recipeView.renderError()
  }
}

const controlSearch = async function(){
  try {    
    const query = searchView.getQuery()
    if (!query) return;    
    resultsView.renderSpinner();
    await model.searchRecipe(query)    
    resultsView.render(model.getSearchResultsforPage(3))
    paginationView.render(model.state.search)
    console.log(model.state)
  } catch (err){
    console.error(err)
 
  }
}

const controlPagination = function(){
  console.log()
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearch)
  paginationView.addHandlerPagination(controlSearch)
}

init()


