import server from '../data/server.js'

const recipesFullUrl = './data/recipes-full.json';
const recipesUrl = './data/recipes.json';
const ingredientsUrl = './data/ingredients.json';

const fillRecipeOfWeek = (recipe, flagCode) => {
    const flag = document.getElementById("featured-recipe-flag");
    const img = document.getElementById("featured-recipe-img");
    const title = document.getElementById("featured-recipe-name");
    const country = document.getElementById("featured-recipe-country");

    flag.src = `https://flagsapi.com/${flagCode}/flat/64.png`;
    img.src = recipe.strMealThumb;
    title.textContent = recipe.strMeal;
    country.textContent = recipe.strArea;
}

const fillCountryRecipes = (recipes, selectedCountry) => {
    const container = document.getElementById("browse-categories");

    //remove the previous recipes
    const previousRecipes = document.getElementById("country-categories");
    if (previousRecipes) {
        container.removeChild(previousRecipes);
    }

    const reciepeContainer = document.createElement("div");
    reciepeContainer.id = "country-categories";
    reciepeContainer.classList.add("top-level-container")
    reciepeContainer.classList.add("home-top-level-container")
    reciepeContainer.classList.add("home-featured-items")

    reciepeContainer.innerHTML = `<h2 id="home-recipes-title" class="categs-title title">${"Top recipes from " + selectedCountry}</h2>`

    const recipeceItemsContainer = document.createElement("div");
    recipeceItemsContainer.classList.add("items-container");
    recipeceItemsContainer.id = "recipe-items-container";

    for (const recipe of recipes) {
        const recipeItem = document.createElement("div");
        recipeItem.classList.add("item-group");
        recipeItem.classList.add("recipe-item-group");
        recipeItem.classList.add("grid-item-1");

        recipeItem.innerHTML = `
            <a class="item-link recipe-link" href="./pages/recipe.html?id=${recipe.idMeal}">
                <img class="item-img recipe-img" src="${recipe.strMealThumb}" />
            </a>`
        recipeceItemsContainer.appendChild(recipeItem);
    }
    
    reciepeContainer.appendChild(recipeceItemsContainer);
    //it should be added to the top of the container
    container.insertBefore(reciepeContainer, container.firstChild);

}


const fillFiveRandomIngredients = (ingredients) => {
    const container = document.getElementById("home-your-facourite-grocerries-container");
    const ingredientsItemsContainer = container.children[1];
    
   for(let i=0; i<5; i++){
        ingredientsItemsContainer.removeChild(ingredientsItemsContainer.children[0]);
   }

   for (const recipe of ingredients) {
    const recipeItem = document.createElement("div");
    recipeItem.classList.add("item-group");
    recipeItem.classList.add("recipe-item-group");
    recipeItem.classList.add("grid-item-1");

    recipeItem.innerHTML = `
        <a class="item-link recipe-link" recipeId=${recipe.idIngredient} href="./pages/recipe.html">
            <img class="item-img recipe-img" src="${"https://www.themealdb.com/images/ingredients/" + recipe.strIngredient + ".png"}" />
        </a>`
    
    ingredientsItemsContainer.insertBefore(recipeItem, ingredientsItemsContainer.firstChild);
}

}



async function main() {
    await server.init(recipesFullUrl, recipesUrl, ingredientsUrl);

    // GLOBE IMPLEMENTATION

    let selectedCountry = null;

    const changeCountry = (countryName) => {
        selectedCountry = countryName;
    }

    const availabe = [
        'United States of America', 'United Kingdom',    'Canada',
        'China',  'Hungary',   'Netherlands',
        'Egypt', 'Philippines',   'France',
        'Greece',    'India',     'Ireland',
        'Italy',  'Jamaica',   'Japan',
        'Kenya',   'Malaysia',  'Mexico',
        'Morocco', 'Poland',     'Portugal',
        'Russia',  'Spain',    'Thailand',
        'Tunisia', 'Turkey',    'Ukraine',  'Vietnam'
    ]


    fetch('./data/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>

        {
        const world = Globe()
        .atmosphereColor('#6FC2E9')
        .labelColor(() => '#111')
        .width(600)
        .height(600)
        .globeImageUrl('./assets/water.png')
        .backgroundColor("#FFFFFF")
        .polygonsData(countries.features)
        //   .polygonsData(countries.features.filter(f => availabe.some(a => a == f.properties.ADMIN)))
        //.globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        //.PolygonMargin(0)
        // .hexPolygonUseDots(false)
        // .polygonCapColor(() => "#FFF")
        .polygonCapColor(f => availabe.some(a => a == f.properties.ADMIN) ? `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}` : "#FFF")
        //   .polygonCapColor(() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`)
        .polygonLabel(({ properties: d }) => availabe.some(a => a == d.ADMIN) ? `
            <b style="color: black;">${d.ADMIN} (${d.ISO_A2})</b> <br />
        ` : '')
        .polygonSideColor(() => '#FFFFFF')
        .polygonStrokeColor(() => '#111')
        .polygonAltitude(0.01)
        .onPolygonClick(({properties: d}) => {
                if(availabe.some(a => a == d.ADMIN)){
                    changeCountry(d.ADMIN)
                    const recipes = server.getRecipiesByCountry(d.ADMIN)
                    fillCountryRecipes(recipes, selectedCountry)
                }
        })
        (document.getElementById('globe'))
    });
    
    const recipe = server.getRandomRecipe();
    const flagCode = server.getFlagCodeByCountry(recipe);
    fillRecipeOfWeek(recipe, flagCode);

    const fiveRandomIngredients = server.getFiveRandomIngredients();
    console.log(fiveRandomIngredients);
    fillFiveRandomIngredients(fiveRandomIngredients);
}

main();