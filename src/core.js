// 1. Create a function named bakingTime that returns 50
function bakingTime() {
  return 50
}
// set the time variable as the value of the contents of the bakingTime value
// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function
function remainingBakeTime(numMinsCakeInOven) {
 const bakingTimeMins = bakingTime() // set time to the value of the contents of bakingTime function, which is always 50, 'resets' the value
 const remainingTime = bakingTimeMins - numMinsCakeInOven // time minus the value input as an argument in remainingBakeTime
  return remainingTime
}

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare

function calculatePreparationTime(numLayers) {
 return numLayers * 3
}

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.
function totalTimeSpent(numLayers, numMinsCakeALreadyInOven) {
  const prepTime = calculatePreparationTime(numLayers)
  return prepTime + numMinsCakeALreadyInOven
}

// Don't change the code below this line
module.exports = {
  /* eslint-disable no-undef */
  bakingTime,
  /* eslint-disable no-undef */
  remainingBakeTime,
  /* eslint-disable no-undef */
  calculatePreparationTime,
  /* eslint-disable no-undef */
  totalTimeSpent
}
