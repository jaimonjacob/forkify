import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { MODAL_CLOLSE_SECONDS } from './config.js'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'
import addReceipeView from './views/addReceipeView.js'



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
    resultsView.update(model.getSearchResultsforPage())
    bookmarksView.update(model.state.bookmarks)    
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
  recipeView.update(model.state.bookmarks)
}

const controlBookmarks = function(){
  !model.state.recipe.bookmarked  ? model.addBookmarks(model.state.recipe) : model.deleteBookmarks(model.state.recipe.id)
  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

const controlLoadBookmarks =function(){
  model.restoreBookmarks();
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
  try{
    addReceipeView.renderSpinner()
    await model.uploadRecipe(newRecipe);    
    addReceipeView.renderMessage()
    bookmarksView.render(model.state.bookmarks)
    recipeView.render(model.state.recipe)
    setTimeout(function(){
      addReceipeView.toggleWindow()
    }, MODAL_CLOLSE_SECONDS * 1000);
  }catch(err){
    addReceipeView.renderError(err.message)
  }
  
}

const init = function(){
  bookmarksView.addEventHandlerBookarks(controlLoadBookmarks)
  addReceipeView.addHandlerUploadRecipe(controlAddRecipe)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerRenderUpdateServings(controlUpdateServings);
  searchView.addHandlerSearch(controlSearch)
  paginationView.addHandlerPagination(controlPagination)
  recipeView.addHandlerBookmarks(controlBookmarks)  
}

init();