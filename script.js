function toggleMenu(){
  var menu = document.getElementById("menu");
  menu.classList.toggle("show");
}
const searchBox = document.querySelector('.searchBox');
const searchButton = document.querySelector('.searchButton');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');


const fetchRecipes = async (query) => {
  recipecontainer.innerHTML="<h2>Fetching recipes....</h2>";
  try {
  
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();

  recipecontainer.innerHTML="";
  response.meals.forEach(meal => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>Belongs to <span>${meal.strCategory}</span> Category</p>
      `
      const button=document.createElement('button');
      button.textContent="Show Recipe";
      recipeDiv.appendChild(button);

      button.addEventListener('click',()=>{
          openRecipePopup(meal);
      });

      recipecontainer.appendChild(recipeDiv);
});
}
catch (error) {
  recipecontainer.innerHTML="<h2>Error in Fetching recipes....</h2>";
}
  // console.log(response.meals[0]);
}
const fetchIngredients=(meal) => {
  let ingredientsList="";
  for(let i=1;i<20;i++){
      const ingredient= meal[strIngredient${i}];
      if(ingredient){
          const measure=meal[strMeasure${i}];
          ingredientsList += <li>${measure} ${ingredient}</li>
      }
      else{
          break;
      }
  }
  return ingredientsList;
}
const openRecipePopup = (meal) =>{
  recipeDetailsContent.innerHTML=`
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="ingredientList">${fetchIngredients(meal)}</ul>
      <div class="recipeInstructions">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
      </div>
      <button class="button">Print</button>
      <button class="button">Share</button>
      <button class="button">Save</button>
  `
  recipeDetailsContent.parentElement.style.display = "block";
}
recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display="none";
});
searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if(!searchInput){
      recipecontainer.innerHTML=<h2>Please type the meal you want to search!!</h2>
      return;
  }
  fetchRecipes(searchInput);
  // console.log("Button Clicked");
})
