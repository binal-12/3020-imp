import server from "../data/server.js";

const recipesFullUrl = '../data/recipes-full.json';
const recipesUrl = '../data/recipes.json';
const ingredientsUrl = '../data/ingredients.json';

async function main() {
    await server.init(recipesFullUrl, recipesUrl, ingredientsUrl);
    console.log("here");

    const params =  new URLSearchParams(window.location.search);
    if(params.has('id')) {
        const id = params.get('id');
        
        const recipe = server.getRecipeById(id);
        const flagCode = server.getFlagCodeByCountry(recipe);
        // Set the title and image

        const titleAndImageContainer = document.getElementsByClassName('recipe-info-top')[0];
        titleAndImageContainer.innerHTML = `
           <div id="recipe-info-left">
                <h1 class="page-title">${recipe.strMeal}</h1>
                <span id="recipe-review-summary">2 Reviews</span>
                <img id="featured-recipe-flag" src="https://flagsapi.com/${flagCode}/flat/64.png" alt="japanese flag">
            </div>
            <div id="recipe-info-right">
                <img id="recipe-main-img" class="recipe-img" src"" />
            </div>
        `;
        titleAndImageContainer.querySelector('#recipe-main-img').src = recipe.strMealThumb;

        //addingredients
        const ingredientsChecklist = document.getElementById('recipe-ingredients-container');
        ingredientsChecklist.removeChild(ingredientsChecklist.children[1]);

        const ingredientsWithMeasurements = server.getIngredientsWithMeasurements(id);
        for (const ingredient of ingredientsWithMeasurements) {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('recipe-ingredients-checkbox-group');
            ingredientItem.innerHTML = `
                <input class="ingredients-checkbox checkbox-input"
                        type="checkbox" name="ingredient" value="ingredient" />
                <label class="ingredients-label checkbox-label"
                        for="ingredient">${ingredient}</label>
            `;
            ingredientsChecklist.appendChild(ingredientItem);
        }

        //directons
        const directionsContainer = document.getElementById('recipe-directions-steps');
        directionsContainer.removeChild(directionsContainer.children[0]);

        const directions = server.getRecipeSteps(id);
        directions.forEach((direction, index) => {
            const directionItem = document.createElement('div');
            directionItem.classList.add('recipe-step-group');
            directionItem.innerHTML = `
                <div class="recipe-step">
                    <span class="recipe-step-number">Step ${index+1}:</span>
                    <span class="recipe-step-instructions">${direction}</span>
                </div>
            `;
            directionsContainer.appendChild(directionItem);
        })

        //ingredient buy panel
        const buyIngredientsList = document.getElementById('recipe-buy-container');
        buyIngredientsList.removeChild(buyIngredientsList.children[1]);

        const ingredients = server.getIngredients(id);
        for (const ingredient of ingredients) {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('recipe-buy-group');
            const products = server.getIngredientsByName(ingredient);
            ingredientItem.innerHTML = `
                <span class="recipe-buy-name">${ingredient}</span>
            `;

            const group = document.createElement('div');
            group.classList.add('recipe-buy-rec');

            for(const product of products) {
                const productItem = document.createElement('div');
                productItem.classList.add('item-group');
                productItem.classList.add('product-item-group');
                productItem.innerHTML = `
                    <a class="item-link product-link" href="../pages/product.html">
                        <img class="item-img product-img" src="" />
                    </a>
                `;
                productItem.querySelector('.product-img').src = "https://www.themealdb.com/images/ingredients/" + product.strIngredient + ".png";
                group.appendChild(productItem);
            }
            ingredientItem.appendChild(group);
            buyIngredientsList.appendChild(ingredientItem);
        }
    }

    
}

main();