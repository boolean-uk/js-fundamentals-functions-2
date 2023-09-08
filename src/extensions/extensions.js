// 1. To help Phil keep track of his baking time, create a function named
// timerStatus that accepts one parameter:
// - the remaining minutes left on a timer
// The function must return "Phil's cake is ready!" if the remaining minutes is 0,
// "The cake is still baking!" if there are any remaining minutes left,
// or "You didn't set a timer!" if no value is provided to the parameter

function timerStatus(minutesLeft){
  if(minutesLeft === 0){
    console.log("Phil's cake is ready")
  }
  else if( typeof minutesLeft === 'number' &&  minutesLeft > 0){
    console.log("The cake is still baking!")
  }
  else if( minutesLeft === ''){
    console.log("You didn't set a timer!")
  }

}

(timerStatus(''))
// 2. To help Phil prepare ahead of time, create a function named estimatePrepTime
// that accepts two parameters:
// - an array of ingredients (e.g. ["sugar", "milk", "flour", "eggs"])
// - the prep time per ingredient in minutes
// The function must return the total prep time the cake will require based on the
// number of ingredients provided and the prep time per ingredient.
// If no prep time per ingredient is provided, the function should assume each ingredient
// takes 2 minutes to prepare

function estimatePrepTime(ingredients, ingredientTime){
  if(typeof ingredientTime === 'number'){
    return ingredients.length * ingredientTime
  }
   else{
     return ingredients.length * 2 
  }
 
}
console.log(estimatePrepTime(["sugar", "milk", "flour", "eggs"], ' '))

// 3. Phil needs to know the quantity of milk and eggs to use! Create a function
// named calculateQuantities which accepts two parameters:
// - a list of ingredients
// - how many layers the cake has
// The cake will need 100g of sugar per layer and 2 eggs per layer, if those ingredients are present.
// The function should always return an object with two keys: sugar, eggs
// The values of the keys should be the total amount of sugar and eggs needed for the cake.
// If sugar or eggs are not present in the list of ingredients, the value for the key should be 0
//
// Example:
// calculateQuantities(["sugar", "milk", "eggs"], 2)
// returns: { sugar: 200, eggs: 4 }
//
// calculateQuantities(["milk", "eggs"], 3)
// returns: { sugar: 0, eggs: 6 }


function calculateQuantities(listOfIngredents, layerOfCake){
const cake = {};
  for(let i = 0; i < listOfIngredents.length; i++ ){
    if(listOfIngredents[i] === 'sugar'){
      cake[listOfIngredents[i]] = 100 * layerOfCake
     
    }

     if(listOfIngredents[i] ==='eggs' ){
      cake[listOfIngredents[i]] = 2 * layerOfCake
    }

    if(listOfIngredents[i] !== 'sugar' && listOfIngredents[i] !== 'eggs'){
      cake[listOfIngredents[i]] = 0
    }
  }
return cake;
}
console.log((calculateQuantities(['sugar', 'eggs'], 3)))
// 4. Phil's cake is pretty small and only provides 1 portion. He wants to make a bigger one!
// Create a function named improveRecipe that accepts two parameters:
// - an object where the keys are ingredients and the values are quantities
//      e.g. { eggs: 2, milk: 100, sugar: 250, flour: 160 }
// - the number of portions the cake should provide
//
// The function should return a new object with the same keys as the recipe provided,
// but the values should have updated amounts to make sure the cake provides enough portions.
//
// Example:
// improveRecipe({ eggs: 2, milk: 100, sugar: 200 }, 3)
// returns: { eggs: 6, milk: 300, sugar: 600 }

function improveRecipe(ingredientKeys, portionValues){
  
  const doubleRecipe = {}

  for (const keys in largeRecipe){
    doubleRecipe[keys] = largeRecipe[keys] * 2 // The keys could be any words
  }

  return doubleRecipe
}

let largeRecipe = { eggs: 13, milk: 50, sugar: 85 }
console.log(improveRecipe(largeRecipe, 4))
// Don't change the code below this line
