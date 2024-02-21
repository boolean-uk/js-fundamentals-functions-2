
function bakingTime() {
  return 50
}

function remainingBakeTime(timeToBake) {
  const timeLeft = bakingTime() - timeToBake
  return timeLeft
}

function calculatePreparationTime(cakeLayers) {
  const bakeTime = cakeLayers * 3
  return bakeTime
}

function totalTimeSpent(cakeLayers, timeToBake) {
  const timeBaking = calculatePreparationTime(cakeLayers) + timeToBake
  return timeBaking
}
console.log(totalTimeSpent(3, 50))

// Don't change the code below this line
module.exports = {
  bakingTime /* eslint-disable-line no-undef */,
  remainingBakeTime /* eslint-disable-line no-undef */,
  calculatePreparationTime /* eslint-disable-line no-undef */,
  totalTimeSpent /* eslint-disable-line no-undef */
}
