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
    //Rendering search results for the first page    
    resultsView.render(model.getSearchResultsforPage())
    //Rendering the navigation buttons for the first page
    paginationView.render(model.state.search)
  } catch (err){
    console.error(err)
 
  }
}

const controlPagination = function(goToPage){
  //Rendering the search results for the page # returned from the button click
  resultsView.render(model.getSearchResultsforPage(goToPage))
//Rendering the buttons for the new search results
  paginationView.render(model.state.search)
  console.log('page console')
}

const controlUpdateServings = function(numServings){
  model.updateQuantityForServings(numServings)
  recipeView.render(model.state.recipe)
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerRenderUpdateServings(controlUpdateServings);
  searchView.addHandlerSearch(controlSearch)
  paginationView.addHandlerPagination(controlPagination)
  
}

init()


