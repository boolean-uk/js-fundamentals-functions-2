// 1. Create a function named bakingTime that returns 50

console.log('Question 1')
// Plan
// Creating function called bakingTime
// Return 50

function bakingTime() {
  return 50
}
console.log(bakingTime())

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function
console.log('Question 2')
// PLAN

// function called remainingBakeTime(numOfMinsInOven)
// const minsLeftRemaining = bakingTime() - numOfMinsOven
// return minsLeftRemaining

function remainingBakeTime(numOfMins) {
  const minsLeftRemaining = bakingTime() - numOfMins
  return minsLeftRemaining
}
console.log(remainingBakeTime(40)) // --> minsLeftRemaining = 50 - 40 = 10

console.log('Question 3')
// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare

// PLAN

// PrepTime - (one parameter - numOfLayers)
// Return how many mins it take to prepare your based - each layer

function calculatePreparationTime(numOfLayersCakeHas) {
  const minsPerLayer = 3
  return numOfLayersCakeHas * minsPerLayer
}

console.log(calculatePreparationTime(3)) // --> 3 layers x 3 mins = 9 mins


console.log('Question 4')
// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.

// PLAN
// function totalTimeSpent(numOfLayers, numOfMinsHasBeenBaking)
// return TOTAL TIME SPENT MAKING CAKE = sum of prep time + num of mins in oven

function totalTimeSpent(numOfLayers, numOfMinsHasBeenBaking) {
  // eslint-disable-next-line no-undef
  // use a variable to store the calculatePreparationTime(with new parameter numOfLayers)
  const TotalprepTime = calculatePreparationTime(numOfLayers)
  return TotalprepTime + numOfMinsHasBeenBaking
}

console.log(totalTimeSpent(1, 30))
// (1 layer x 3 mins = 3) + 30 = 33


// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
