// 1. Create a function named bakingTime that returns 50
function bakingTime(){
  return 50
}
let input = bakingTime()
console.log(input)

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function


function remainingBakeTime(){
  const totalBakingTime = bakingTime()
 if (minutesInOven < totalBakingTime){
  return totalBakingTime - minutesInOven
 }
 else {
  return 0
 }
}
let minutesInOven = 20
let remainginTime = remainingBakeTime(minutesInOven)
console.log(remainginTime)  


// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare
function calculatePreparationTime(numberOfLayers){
const timePerLayer = 3
return numberOfLayers * timePerLayer
}
let layers = 4
let preperationTime = calculatePreparationTime(layers)
console.log(preperationTime)

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.

function totalTimeSpent(numberOfLayers, minutesInOven){
  const preperationTime = calculatePreparationTime(numberOfLayers)
return preperationTime + minutesInOven
}
let timeInKitchen = totalTimeSpent(layers, minutesInOven)
console.log(timeInKitchen)


// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
