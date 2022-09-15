// 1. Create a function named bakingTime that returns 50
function bakingTime(){
  return 50
}

const result = bakingTime()
console.log(result)
// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
function remainingBakeTime(number) {
let remainMinutes = bakingTime() - number
return console.log(` Your cake has ${remainMinutes} minutes left`)
} 
remainingBakeTime(14)
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare
function calculatePreparationTime(number) {
  return number * 3
}
const result1 = calculatePreparationTime(10)
console.log(result1)
 // return console.log(` It will take ${prepTime} minutes to prepare a cake`)




// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.
function totalTimeSpent(num1, num2) {
  let totalTime = calculatePreparationTime(num1) + (bakingTime() - num2)
return console.log(` You have spent ${totalTime} minutes to make your cake` )
}
totalTimeSpent(4, 15 )
 

// Don't change the code below this line
module.exports = {

  bakingTime,
  
  //remainingBakeTime,
  
  //calculatePreparationTime,
  
  //totalTimeSpent
}
