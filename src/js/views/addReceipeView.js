import View from './View.js'
import icons from '../../img/icons.svg'

class AddRecipeView extends View {
   _parentEl = document.querySelector('.bookmarks');
   _overlay = document.querySelector('.overlay');
   _btnUpload = document.querySelector('.upload__btn');
   _btnCloseModal = document.querySelector('.btn--close-modal');
   _addWindow = document.querySelector('.add-recipe-window');
   _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');


  

  _showAddRecipeWindow(){
    this._btnAddRecipe.addEventListener("click", )
  } 


   addEventHandlerShowForm(handler){
    window.addEventListener('load', handler)
   }


}
export default new AddRecipeView();