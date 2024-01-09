let all_recipes = new Array();    // List of all recipes
let shopping_list = new Array();  // List of ingredients in selected recipes
let currently_selected = -1;      // Recipe ID of recipe currently in the selected viewer


/**
 * Class representing a recipe ingredient.
 */
class Ingredient {

    /**
     * Creates a new ingredient.
     * @param {string} name - Ingredient name
     */
    constructor(name) {
        this.name = name;  // Ingredient name
    }

}


/**
 * Class representing a recipe.
 */
class Recipe {

    /**
     * Creates a new recipe with the given name and ingredients list.
     * @param {string} name - Recipe name
     * @param {Ingredient[]} ingredients - Ingredients list
     */
    constructor(name, ingredients) {

        this.id_num = -1;  // Recipe ID number corresponds to index in the array
        this.name = name;  // Recipe name
        this.ingredients = ingredients;  // Ingredients list
        this.is_added = false;  // Tracks if the recipe is currently in the "Menu"

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
const tomato_cherry = new Ingredient('Cherry Tomatos');


/* Define recipes */
const bagel_sandwich = new Recipe('Bagel Sandwich', [arugula, bagel, bacon, egg]);
const shakshouka = new Recipe('Shakshouka', [tomato_canned, onion, egg]);
const roasted_potatoes = new Recipe('Roasted Potatoes', [potato]);



/**
 * Compares two recipes lexicographically by their names, and returns an integer
 * to indicate the result of the comparison.
 * @param {Recipe} recipe1 - Recipe #1 to compare
 * @param {Recipe} recipe2 - Recipe #2 to compare
 * @returns 1 - Recipe #1's name > recipe #2's name
 *          0 - Recipe #1 and recipe #2 have the same name
 *         -1 - Recipe #1's name < recipe #2's name
 */
function sortByName(recipe1, recipe2) {

    var result;  // Integer indicating the result of the comparison

    // Compare the recipes lexicographically by their names
    if (recipe1.name < recipe2.name){
        result = -1;
    }
    else if (recipe1.name > recipe2.name) {
        result = 1;
    }
    else {  // The two recipes have the same name
        result = 0;
    }

    return result;

}


all_recipes.sort(sortByName);  // Sort recipe list alphabetically

// Set recipe ID numbers to correspond to index in array
for (i = 0; i < all_recipes.length; i++) {
    let recipe = all_recipes[i];
    recipe.id_num = i;
}


/**
 * Displays the list of recipes.
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
 * Moves the recipe with the given ID number to the "Selected" viewer and Uupdates
 * the "Add To Menu" button to tie it to the recipe being viewed.
 * @param {number} recipe_id - Recipe ID of the recipe to view. Same as its index
 * in the recipe list array.
 */
function select(recipe_id) {

    let selected_recipe_div_HTML = document.getElementById("selected-recipe");  // Reference to the HTML element displaying the selected recipe to view

    const recipe = all_recipes[recipe_id];  // Recipe to move to viewer
    currently_selected = recipe_id;  // Update global variable tracking selected recipe

    selected_recipe_div_HTML.innerHTML = `<p>${recipe.name}</p>`;  // Update viewer

    // Reset "Add To Menu" button
    document.getElementById("add-button");  // Remove button tied to previously selected item

    var add_button = document.createElement('button');  // Create new button 
    add_button.setAttribute("id", "add-button");
    add_button.style.display = "block";
    add_button.innerText = "Add to Menu";
    add_button.disabled = true;
    selected_recipe_div_HTML.appendChild(add_button);  // Add button to viewer

    if (recipe.is_added === false){  // If recipe not added to "Menu"
        
        add_button.disabled = false;  // Allow button to be clicked
        add_button.addEventListener('click', function(){addToMenu(recipe_id)}, {once: true});  // Tie click event to the function to add the recipe with the given ID. Only allow to be added once.

    }

}


/**
 * Adds the recipe with the given ID number to the "Menu". Updates the "Add To
 * Menu" button to prevent it from appearing functional.
 * @param {number} recipe_id - Recipe ID of the selected recipe to add. Same as its index
 * in the recipe list array.
 */
function addToMenu(recipe_id) {

    let menu_div_HTML = document.getElementById("menu-list");  // Reference to the HTML element displaying the chosen recipes
    
    const recipe = all_recipes[recipe_id];  // Recipe to add to menu

    // Create new list item for the recipe
    let li = document.createElement('li');
    li.setAttribute("id", `menu-list-${recipe_id}`);
    li.innerHTML = `<p>${recipe.name}</p><button onclick="removeFromMenu(${recipe_id})">Remove</button>`;
    menu_div_HTML.appendChild(li);  // Add to current menu list

    recipe.is_added = true;  // Update attribute to indicate recipe is in the "Menu"

    document.getElementById("add-button").disabled = true;  // Do not allow "Add To Menu" button to be clicked again


}


/**
 * Removes the recipe with the given ID number from the "Menu". If the recipe
 * removed is currently being viewed in the "Selected" viewer, the "Add To Menu"
 * button is updated to allow the recipe to be re-added to the "Menu".
 * @param {number} recipe_id - Recipe ID of the recipe to add. Same as its index
 * in the recipe list array.
 */
function removeFromMenu(recipe_id) {

    // Remove "Menu" element corresponding to the recipe with the given ID
    let recipe_HTML = document.getElementById(`menu-list-${recipe_id}`);
    recipe_HTML.remove();

    const recipe = all_recipes[recipe_id];  // Recipe removed
    recipe.is_added = false;  // Update attribute to indicate recipe is no longer in the "Menu"
    
    if (currently_selected === recipe_id) {  // Removed recipe is the one currently in the selected viewer 

        // Reset the "Add To Menu" button to allow it to be re-added
        let add_button = document.getElementById("add-button");
        add_button.disabled = false;  // Allow button to be clicked
        add_button.addEventListener('click', function(){addToMenu(recipe_id)}, {once: true});  // Tie click event to the function to add the recipe with the given ID
    
    }

}


