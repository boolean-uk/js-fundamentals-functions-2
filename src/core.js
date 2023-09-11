// 1. Create a function named bakingTime that returns 50
const bakingTime = () => 50
console.log(bakingTime())
// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
const remainingBakeTime = (minutes) => bakingTime() - minutes
console.log(`The number of minutes your cake has been in the oven is ${remainingBakeTime(20)}mins `)
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
const calculatePreparationTime = (layers) => layers * 3
console.log(`The number of layers in your cake is ${calculatePreparationTime(2)}`)
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.
const totalTimeSpent = (layers, minutes) =>
  minutes + calculatePreparationTime(layers)
  console.log(`Total time spent in making the cake is ${totalTimeSpent(2,20)}mins`)
// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
