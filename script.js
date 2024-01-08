let all_recipes = new Array(); // List of all recipes
let added_recipes = new Array();  // List of selected recipes for the week
let shopping_list = new Array();  // List of ingredients in selected recipes

// TODO: Class works, need to add documentation
class Ingredient {

    constructor(name) {
        this.name = name;
    }

}


// TODO: Class works, need to add documentation
class Recipe {

    constructor(name, ingredients) {

        this.id_num = all_recipes.length;  // Corresponds to index in the array
        this.name = name;
        this.ingredients = ingredients;
        this.is_added = false;

        all_recipes.push(this);  // Append recipe to the list

    }

}


/* Define ingredients */
const bagel = new Ingredient('Bagel'); /* Bakery*/
const bread = new Ingredient('Bread');

const egg = new Ingredient('Eggs');  /* Dairy */
const milk = new Ingredient('Milk');

const bacon = new Ingredient('Bacon'); /* Meat */
const beef_ground = new Ingredient('Ground Beef');
const chicken_breast = new Ingredient('Chicken (Breast)');
const chicken_thigh = new Ingredient('Chicken (Thigh)');

const chickpeas = new Ingredient('Chickpeas'); /* Pantry */
const broth_chicken = new Ingredient('Chicken Broth');
const broth_vegetable = new Ingredient('Vegetable Broth');
const tomato_canned = new Ingredient('Canned Tomatoes');

const arugula = new Ingredient('Arugula'); /* Produce */
const avocado = new Ingredient('Avocado');
const lettuce = new Ingredient('Lettuce');
const onion = new Ingredient('Onion');
const pepper = new Ingredient('Bell Pepper');
const potato = new Ingredient('Potato');
const tomato_beefsteak = new Ingredient('Beefsteak Tomato');
const tomato_cherry = new Ingredient('Cherry Tomato');


/* Define recipes */
const bagel_sandwich = new Recipe('Bagel Sandwich', [arugula, bagel, bacon, egg]);
const shakshouka = new Recipe('Shakshouka', [tomato_canned, onion, egg]);



// TODO: Function works, need to add documentation
function displayRecipes() {
    
    let recipe_list_HTML = document.getElementById("recipe-list");

    for (i = 0; i < all_recipes.length; ++i) {

        let recipe = all_recipes[i];

        let li = document.createElement('li');
        li.innerHTML = `<button id="${recipe.id_num}" onclick="select(${recipe.id_num})">${recipe.name}</button>`;
        recipe_list_HTML.appendChild(li);
    }

}


// Function moves a recipe to the "Selected" viewer when clicked
function select(recipe_id) {

    let selected_recipe_div_HTML = document.getElementById("selected-recipe");
    let recipe = all_recipes[recipe_id];

    selected_recipe_div_HTML.innerHTML = `<p>${recipe.name}</p>`; // TODO: fix this

    var add_remove_button = document.createElement('button');

    if (!recipe.is_added) {

        add_remove_button.innerText = "Add to menu";
        add_remove_button.addEventListener('click', function(){addToMenu(recipe_id)});

    }
    
    selected_recipe_div_HTML.appendChild(add_remove_button);

}


function addToMenu(recipe_id) {

    let menu_div_HTML = document.getElementById("menu-list");
    
    let recipe = all_recipes[recipe_id];

    // Create new list item for the recipe added
    let li = document.createElement('li');  
    li.innerHTML = `<p>${recipe.name}</p>`;
    menu_div_HTML.appendChild(li);

}


