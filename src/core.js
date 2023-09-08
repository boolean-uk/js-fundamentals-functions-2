// 1. Create a function named bakingTime that returns 50

function bakingTime(time) {
  return 50
}

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.

function remainingBakeTime(numOfMins) {
  const minsLeftRemaining = bakingTime() - numOfMins
  return minsLeftRemaining
}


// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has

function calculatePreparationTime(numOfLayersCakeHas) {
  const minsPerLayer = 3
  return numOfLayersCakeHas * minsPerLayer
}

console.log(calculatePreparationTime(3))

//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.

function totalTimeSpent(cakeLayer, timePassedInOven) {
  return  calculatePreparationTime(cakeLayer) + bakingTime() - remainingBakeTime(timePassedInOven)
}

// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
