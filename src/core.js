// 1. Create a function named bakingTime that returns 50
function bakingTime() {
  const time = 50
  console.log(`Baking time: ${time} minutes`)
  return time
}

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function
function remainingBakeTime(minutesInOven) {
  const totalBakingTime = bakingTime()
  const remainingTime = totalBakingTime - minutesInOven
  console.log(
    `Remaining bake time: ${remainingTime >= 0 ? remainingTime : 0} minutes`
  )
  return remainingTime >= 0 ? remainingTime : 0 // Ensure the result is not negative
}
remainingBakeTime(3)

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare
function calculatePreparationTime(numLayers) {
  const preparationTime = numLayers * 3
  console.log(
    `Preparation time for ${numLayers} layers: ${preparationTime} minutes`
  )
  return preparationTime
}
calculatePreparationTime(7)

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.
function totalTimeSpent(numLayers, minutesInOven) {
  const preparationTime = calculatePreparationTime(numLayers)
  const totalSpentTime = preparationTime + minutesInOven
  console.log(`Time spent making cake: ${totalSpentTime} minutes`)
  return totalSpentTime
}
totalTimeSpent(4, 20)
// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
