import View from './View.js'
import icons from '../../img/icons.svg'

class AddRecipeView extends View {
   _parentEl = document.querySelector('.upload');
   _overlay = document.querySelector('.overlay');
   _btnUpload = document.querySelector('.upload__btn');
   _btnCloseModal = document.querySelector('.btn--close-modal');
   _addWindow = document.querySelector('.add-recipe-window');
   _btnOpenModal = document.querySelector('.nav__btn--add-recipe');

  constructor(){
    super();

    this._showAddRecipeWindow()
    
    this._hideAddRecipeWindow()
  }

  _toggleClasses(){
    this._addWindow.classList.toggle('hidden');
    console.log("clicked");
    this._overlay.classList.toggle('hidden');
  }

  _showAddRecipeWindow(){
    this._btnOpenModal.addEventListener('click', this._toggleClasses.bind(this))
  } 

  _hideAddRecipeWindow(){
    this._btnCloseModal.addEventListener('click', this._toggleClasses.bind(this))
    this._overlay.addEventListener('click', this._toggleClasses.bind(this))
  } 

  addHandlerUploadRecipe(handler){
    this._parentEl.addEventListener("submit", function(e){
      e.preventDefault();
      
      const formArr = [...new FormData(this)]
      const data = Object.fromEntries(formArr)
      console.log(data)  
      handler(data);

    })
  }


}
export default new AddRecipeView();