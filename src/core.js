// 1. Create a function named bakingTime that returns 50
function bakingTime() {
  return 50;
}

// 2. Create a function named remainingBakeTime that accepts one parameter:
// - the number of minutes your cake has been in the oven.
//
// It must return how many minutes your cake has left based on your parameter
// and the result of the bakingTime function
function remainingBakeTime(minutesInOven) {
  const totalBakingTime = bakingTime();
  if (minutesInOven >= totalBakingTime) {
    console.log('Cake is done!');
    return 0; // Cake is done
  } else {
    const remainingTime = totalBakingTime - minutesInOven;
    console.log(`Cake has ${remainingTime} minutes left`);
    return remainingTime;
  }
}

// 3. Create a function named calculatePreparationTime that accepts one parameter:
// - the number of layers your cake has
//
// It must return how many minutes it will take to prepare your cake, based on
// each layer taking 3 minutes to prepare
function calculatePreparationTime(numLayers) {
  const preparationTime = numLayers * 3;
  console.log(`Preparation time for ${numLayers} layers is ${preparationTime} minutes`);
  return preparationTime;
}

// 4. Create a function named totalTimeSpent that accepts two parameters:
// - the number of layers your cake has
// - the number of minutes the cake has already been baking in the oven
// It must return how many minutes in total you have spent making the cake,
// which is the sum of the preparation time and the number of minutes it's been in the oven.
// Use your calculatePreparationTime function in the calculation.
function totalTimeSpent(numLayers, minutesInOven) {
  const preparationTime = calculatePreparationTime(numLayers);
  const totalTime = preparationTime + minutesInOven;
  console.log(`Total time spent making the cake: ${totalTime} minutes`);
  return totalTime;
}

// Testing the funktions
console.log("Baking Time:", bakingTime());
console.log("Remaining Bake Time:", remainingBakeTime(30));
console.log("Preparation Time:", calculatePreparationTime(5));
console.log("Total Time Spent:", totalTimeSpent(5, 30));

// Don't change the code below this line
module.exports = {
  bakingTime,
  remainingBakeTime,
  calculatePreparationTime,
  totalTimeSpent
};
