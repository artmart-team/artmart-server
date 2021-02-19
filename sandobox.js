let names = [{
    first : 'afista',
    last : 'pratama'
},{
    first : 'shofia',
    last : 'adita'
}]

// if(typeof names == 'object') {
//     console.log(true)
// } else {
//     console.log(false)
// }

console.log(Array.isArray(names))
names.forEach(nam => {
    if(typeof nam == 'object') {
        console.log(true)
    }

})

