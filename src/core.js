// 1. Create a function named bakingTime that returns 50
function bakingTime() {
  return 50
}

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function

let remainingTime = ''
function remainingBakeTime(timeIn) {
  remainingTime = bakingTime() - timeIn
  return remainingTime
}
remainingBakeTime(10)

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare
const timeForOneLayer = 3
function calculatePreparationTime(layers) {
  const totalTime1 = timeForOneLayer * layers
  return totalTime1
}
calculatePreparationTime(3)
// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.

function totalTimeSpent(layers, minutesInOven) {
  const PreperationtotalTime = timeForOneLayer * layers
  const totalTime = PreperationtotalTime + minutesInOven
  return totalTime
}
totalTimeSpent(2, 15)
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
