import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//2fb8c90a-c94a-4485-ace1-394ebb44d609

//5ed6604591c37cdc054bc8fd
//5ed6604591c37cdc054bca5d


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)
    if (!id) return;//guard close
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe)
  } catch (err) {
    console.log(err)
  }
}


window.addEventListener('hashchange', controlRecipes);
window.addEventListener('load', controlRecipes);

