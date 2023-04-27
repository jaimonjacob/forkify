import View from './View.js'
import icons from '../../img/icons.svg'

class PaginationView extends View {
   _parentEl = document.querySelector('.pagination');
   

   _generateMarkup(){
    //Identifying the number of pages that correlate with the number of results
      const currPage = this._data.currentPage;
        const numPages = Math.ceil(this._data.results.length/this._data.resultsPerPage);

  //Identifying what button to show by identifying the current page
   //if the currentpage is 1 and there are other pages
      if (currPage === 1 && numPages > 1) {
         return `
          <button data-goto=${currPage + 1} class="btn--inline pagination__btn--next">
         <span>${currPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>
       `
      }

   //Last page
   if (currPage === numPages && numPages > 1) {
      return `
      <button data-goto=${currPage - 1} class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${currPage - 1}</span>
    </button>`
   }

   //Other pages
   if (currPage < numPages) {
      return`
      <button data-goto=${currPage - 1} class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${currPage - 1}</span>
    </button>
    <button data-goto=${currPage + 1} class="btn--inline pagination__btn--next">
      <span>${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`
   }

   //First page
      return ''

   } 
   
  addHandlerPagination(handler){
    this._parentEl.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage) 
    }) 
  } 


}
export default new PaginationView();