// 1. Create a function named bakingTime that returns 50
function bakingTime() {
  return 50
}
console.log(50)

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
function remainingBakeTime(minutesInOven) {
  const totalBakeTime = 50
  if (minutesInOven >= totalBakeTime) {
    return 0
  } else {
    return totalBakeTime - minutesInOven
  }
}
console.log(remainingBakeTime(20))

// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
function calculatePreparationTime(numberOfLayers){
  const timePerLayer = 3
  const totalTimeToPrepare = numberOfLayers * timePerLayer
  return totalTimeToPrepare
}

console.log(calculatePreparationTime(4))

// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.

function calculatePreparationTime(numberOfLayers){
  const timePerLayer = 3
  const totalTimeToPrepare = numberOfLayers * timePerLayer
  return totalTimeToPrepare
}

function totalTimeSpent(numberOfLayers, minutesInOven){
  const preparationTime = calculatePreparationTime (numberOfLayers)
  const totalTimeSpent = preparationTime + minutesInOven
  return totalTimeSpent
}

console.log(totalTimeSpent(3, 30))
// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
