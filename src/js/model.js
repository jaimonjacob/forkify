export const state = {
    recipe : {}
}

export const loadRecipe = async function(id){
  try{
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`There is an error...${data.message}`)
    }  
  const {recipe} = data.data;
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
  console.log(state.recipe) 
  }catch(err){
    console.log(err)
  }

} 