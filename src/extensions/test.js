const testobject = { eggs: 2, milk: 100, sugar: 250, flour: 160 }
const portions = 5
let new_object = testobject
ingedrients = Object.keys(testobject)
console.log(ingedrients)

ingedrients.forEach((ingedrient) => {
    new_object[ingedrient] = testobject[ingedrient] * portions
})

console.log(new_object)
