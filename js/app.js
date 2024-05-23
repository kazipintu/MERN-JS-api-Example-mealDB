// console.log('connected');

// categories on home page
const loadCategory = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}
loadCategory()


const displayCategories = (categories) => {

  const categoryBox = document.getElementById("categories");
  foods.map(category => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div onclick="seeFoodDetails('${category.idCategory}')" class="border-2 p-3 rounded">
        <img class="w-full h-72" src="${category.strCategoryThumb}" alt="">
        <h5 class="text-xl>ID: ${category.idCategory} </h5>
        <h2 class="text-2xl ">Name: ${category.strCategory} </h3>
        <p>Description: ${category.strCategoryDescription} .... </p>
      </div>
    `
    categoryBox.appendChild(div)
    //console.log(div);
  })
}


// food page
document.getElementById('search-button').addEventListener('click', function () {
  // console.log('button clicked');
  const input = document.getElementById('search-field');
  const inputText = input.value;
  // console.log(inputText);

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data.meals))
  // value clear
  input.value = "";

})

const displayFood = (foods) => {
  //console.log(foods);
  const categoryBox = document.getElementById("categories");
  categoryBox.innerHTML = "";

  const detailsFoodBox = document.getElementById("details");
  detailsFoodBox.innerHTML = "";

  const allFoodBox = document.getElementById("food-all");
  allFoodBox.innerHTML = "";

  foods.map(food => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div onclick="seeFoodDetails('${food.idMeal}')" class="border-2 p-3 rounded">
        <img class="w-full h-72" src="${food.strMealThumb}" alt="">
        <h5 class="text-xl>ID: ${food.idMeal} </h5>
        <h2 class="text-2xl ">Name: ${food.strMeal} </h3>
        <h4 class="text-xl">Category: ${food.strCategory} </h4>
        <h4>Location:  ${food.strArea} </h4>
        <p>Recipe: ${food.strInstructions.slice(0, 150)} .... </p>
      </div>
    `
    allFoodBox.appendChild(div)
    //console.log(div);
  })
}

const seeFoodDetails = (id) => {
  // console.log(id);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => displayDetailsFood(data.meals[0]))

}

const displayDetailsFood = (food) => {
  const detailsFoodBox = document.getElementById("details");
  detailsFoodBox.textContent = "";
  const div = document.createElement('div');

  div.innerHTML = `
      <div class="w-[65%] mx-auto border-2 border-blue-400 p-3 rounded mb-5 ">
        <img class="w-full" src="${food.strMealThumb}" alt="">
        <h5 class="text-xl>ID: ${food.idMeal} </h5>
        <h2 class="text-2xl ">Name: ${food.strMeal} </h3>
        <h4 class="text-xl">Category: ${food.strCategory} </h4>
        <h4>Location:  ${food.strArea} </h4>
        <p>Recipe: ${food.strInstructions} .... </p>
        <a href="${food.strYoutube}" target="_blank" class="my-5 block text-center bg-blue-400 mx-2 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-600"> See Video </a>
      </div>
    `
  detailsFoodBox.appendChild(div)
  window.scrollTo({ top: 0, behavior: 'instant' })

}