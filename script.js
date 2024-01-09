let all_recipes = new Array(); // List of all recipes
let shopping_list = new Array();  // List of ingredients in selected recipes
let currently_selected = -1; // ID of recipe currently in the selected viewer

/**
 * TODO: Documentation
 */
class Ingredient {

    constructor(name) {
        this.name = name;
    }

}


/**
 * TODO: Documentation
 */
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
const roasted_potatoes = new Recipe('Roasted Potatoes', [potato]);



/**
 * Displays the list of recipes.
 * TODO: Make function display the recipes in alphabetical order
 */
function displayRecipes() {

    var recipe_list_HTML = document.getElementById("recipe-list");  // Reference to the HTML element displaying the list of recipes

    for (i = 0; i < all_recipes.length; ++i) {  // Iterate over all recipes

        let recipe = all_recipes[i];
        
        // Create HTML element for each recipe
        let li = document.createElement('li');
        li.innerHTML = `<button id="${recipe.id_num}" onclick="select(${recipe.id_num})">${recipe.name}</button>`;
        recipe_list_HTML.appendChild(li);  // Add recipe to the existing list
    }

}


/**
 * Updates the Add To Menu button to add the recipe with the given ID to the
 * menu when clicked.
 * @param {number} recipe_id Recipe ID of the recipe to add to the menu. Equal
 * to its index in the recipe list array.
 */
function allowAdd(recipe_id) {

    var add_button = document.getElementById("add-button");
    add_button.disabled = false;  // Allow button to be clicked
    add_button.addEventListener('click', function(){addToMenu(recipe_id)}, {once: true});  // Tie click event to the function to add the recipe with the given ID

}


/**
 * Moves the recipe with the given ID number to the "Selected" viewer
 * @param {number} recipe_id Recipe ID of the recipe to view. Equal to its index
 * in the recipe list array.
 */
function select(recipe_id) {

    let selected_recipe_div_HTML = document.getElementById("selected-recipe");  // Reference to the HTML element displaying the selected recipe to view

    currently_selected = recipe_id;

    let recipe = all_recipes[recipe_id];

    selected_recipe_div_HTML.innerHTML = `<p>${recipe.name}</p>`;

    if (recipe.is_added === false) {
        allowAdd(recipe_id);
    }

}


function addToMenu(recipe_id) {

    let menu_div_HTML = document.getElementById("menu-list");
    
    let recipe = all_recipes[recipe_id];

    // Create new list item for the recipe added
    let li = document.createElement('li');
    li.setAttribute("id", `menu-list-${recipe_id}`);

    li.innerHTML = `<p>${recipe.name}</p><button onclick="removeFromMenu(${recipe.id_num})">Remove</button>`;
    
    menu_div_HTML.appendChild(li);

    recipe.is_added = true;

    // Update the add to menu button to be disabled again
    let add_button = document.getElementById("add-button");
    add_button.disabled = true;

}

function removeFromMenu(recipe_id) {

    let recipe_HTML = document.getElementById(`menu-list-${recipe_id}`);
    recipe_HTML.remove();

    let recipe = all_recipes[recipe_id];
    recipe.is_added = false;
    
    select(currently_selected);  // Resets the "Add To Menu" button


}


