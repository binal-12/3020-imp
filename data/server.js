

const countryMapping = [
    {
        country: 'United States of America',
        area: 'American',
        code: 'US'
    },
    {
        country: 'United Kingdom',
        area: 'British',
        code: 'GB'
    },
    {
        country: 'Canada',
        area: 'Canadian',
        code: 'CA'
    },
    {
        country: 'China',
        area: 'Chinese',
        code: 'CN'
    },
    {
        country: 'Croatia',
        area: 'Croatian',
        code: 'HR'
    },
    {
        country: 'Netherlands',
        area: 'Dutch',
        code: 'NL'
    },
    {
        country: 'Egypt',
        area: 'Egyptian',
        code: 'EG'
    },
    {
        country: 'Philippines',
        area: 'Filipino',
        code: 'PH'
    },
    {
        country: 'France',
        area: 'French',
        code: 'FR'
    },
    {
        country: 'Greece',
        area: 'Greek',
        code: 'GR'
    },
    {
        country: 'India',
        area: 'Indian',
        code: 'IN'
    },
    {
        country: 'Ireland',
        area: 'Irish',
        code: 'IE'
    },
    {
        country: 'Italy',
        area: 'Italian',
        code: 'IT'
    },
    {
        country: 'Jamaica',
        area: 'Jamaican',
        code: 'JM'
    },
    {
        country: 'Japan',
        area: 'Japanese',
        code: 'JP'
    },
    {
        country: 'Kenya',
        area: 'Kenyan',
        code: 'KE'
    },
    {
        country: 'Malaysia',    
        area: 'Malaysian',
        code: 'MY'
    },
    {
        country: 'Mexico',
        area: 'Mexican',
        code: 'MX'
    },
    {
        country: 'Morocco',
        area: 'Moroccan',
        code: 'MA'
    },
    {
        country: 'Poland',
        area: 'Polish',
        code: 'PL'
    },
    {
        country: 'Portugal',
        area: 'Portuguese',
        code: 'PT'
    },
    {
        country: 'Russia',
        area: 'Russian',
        code: 'RU'
    },
    {
        country: 'Spain',
        area: 'Spanish',
        code: 'ES'
    },
    {
        country: 'Thailand',
        area: 'Thai',
        code: 'TH'
    },
    {
        country: 'Tunisia',
        area: 'Tunisian',
        code: 'TN'
    },
    {
        country: 'Turkey',
        area: 'Turkish',
        code: 'TR'
    },
    {
        country: 'Ukraine',
        area: 'Ukrainian',
        code: 'UA'
    },
    {
        country: 'Vietnam',
        area: 'Vietnamese',
        code: 'VN'
    }
]

class Server {
    constructor() {
        this.recipesFull = [];
        this.recipes = [];
        this.ingredients = [];
    }

    async loadJson(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}`);
        }
        return response.json();
    }

    async init(recipesFullUrl, recipesUrl, ingredientsUrl) {
        this.recipesFull = await this.loadJson(recipesFullUrl);
        this.recipes = await this.loadJson(recipesUrl);
        this.ingredients = await this.loadJson(ingredientsUrl);
    }

    //All the functions

    getRandomRecipe(){
        return this.recipesFull[Math.floor(Math.random() * this.recipesFull.length)];
    }

    getRecipeById(id){
        return this.recipesFull.find(recipe => recipe.idMeal === id);
    }

    getRecipies(keyword){
        return this.recipes.filter(recipe => recipe.strMeal.includes(keyword));
    }

    getRecipiesByCountry(country){
        return this.recipesFull.filter(recipe => recipe.strArea === countryMapping.find(c => c.country === country).area);
    }

    getFlagCodeByCountry(recipe){
        return countryMapping.find(c => c.area === recipe.strArea).code;
    }

    getFiveRandomIngredients(){
        const ingredients = [];
        for (let i = 0; i < 5; i++) {
            ingredients.push(this.ingredients[Math.floor(Math.random() * this.ingredients.length)]);
        }
        return ingredients;
    }

    getIngredients(recipeID){
        const recipe = this.getRecipeById(recipeID);
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
        return ingredients; 
    }

    getIngredientsWithMeasurements(recipeID){
        const recipe = this.getRecipeById(recipeID);
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measurement = recipe[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`${measurement} ${ingredient}`);
            }
        }
        return ingredients; 
    }

    getRecipeSteps(recipeID){
        const recipe = this.getRecipeById(recipeID);
        return recipe.strInstructions.split('\r\n');
    }

    //should be max 4
    getIngredientsByName(ingredientName){
        return this.ingredients.filter(ingredient => ingredient.strIngredient.toLowerCase().includes(ingredientName.toLowerCase())).slice(0, 4);
    }
}

// Export the server instance
export default new Server();
