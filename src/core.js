// 1. Create a function named bakingTime that returns 50
function bakingTime(){
  return 50;
}

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function

function remainingBakeTime(minutes) {
  // Get the total baking time using the bakingTime function
  const totalBakingTime = bakingTime();
  
  // Calculate the remaining bake time
  const remainingTime = totalBakingTime - minutes;
  
  // Return the remaining bake time
  return remainingTime;
}


// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare

function calculatePreparationTime (layers){
  // Calculate the total preparation time based on the number of layers
  const preparationTime = layers * 3;
  
  // Return the total preparation time
  return preparationTime;
}

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.

function totalTimeSpent(layers, bakingMinutes){
// Calculate the total preparation time using the calculatePreparationTime function
const preparationTime = calculatePreparationTime(layers);
  
// Calculate the total time spent by adding the preparation time and baking time
const totalTime = preparationTime + bakingMinutes;

// Return the total time spent
return totalTime;

}
// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
