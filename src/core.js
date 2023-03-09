// 1. Create a function named bakingTime that returns 50
function bakingTime(time) {
  time = 50
  return time
}

const x = 0
console.log(bakingTime(x))

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function
function remainingBakeTime(progress) {
  if (progress >= 50) {
    const rbTime = 0
    return rbTime
  } else if (progress >= 0 && progress < 50) {
    const rbTime = 50 - progress
    return rbTime
  }
}

console.log(remainingBakeTime(47))

// total time - time already in over

// remaining time

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare
function calculatePreparationTime(layers) {
  const pTime = layers * 3
  return pTime
}

console.log(calculatePreparationTime(10))

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.
function totalTimeSpent(layers, bProgress) {
  const totalTimeSoFar = calculatePreparationTime(layers) + bProgress
  return totalTimeSoFar
}
console.log(totalTimeSpent(10, 15))

// total time making cake so far = prep + cooking

// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
