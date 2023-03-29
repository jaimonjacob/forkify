import icons from '../../img/icons.svg'
export default class View {
    _data

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        this._clearHTML();
        const markup = this._generateMarkup();
        this._parentEl.insertAdjacentHTML('afterbegin', markup)
    }

  update(data){
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    const newMarkup = this._generateMarkup();
    this._data = data;
    const newDom = document.createRange().createContextualFragment(newMarkup);    
    const newElements = Array.from(newDom.querySelectorAll("*"))    
    const currElements = Array.from(this._parentEl.querySelectorAll("*"));    
    newElements.forEach((newEl, i) => {
      const currEl = currElements [i]; 
      //Changing text
      if (! newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !==`` ) {
        currEl.textContent = newEl.textContent;
      }

      //Changing attributes
      if(!newEl.isEqualNode(currEl)) {        
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value)})
      }
    })

  }  


    _clearHTML() {
        this._parentEl.innerHTML = ''
    }

    renderSpinner() {
        const markup = `
        <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
        </div>
        `
        this._clearHTML()
        this._parentEl.insertAdjacentHTML(`afterbegin`, markup)
    }

    renderError(message = this._errorMessage) {
        const markup = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
  `
        this._clearHTML()
        this._parentEl.insertAdjacentHTML(`afterbegin`, markup)
    }

    renderMessage(message = this._message) {
        const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
  `
        this._clearHTML()
        this._parentEl.insertAdjacentHTML(`afterbegin`, markup)
    }    

}