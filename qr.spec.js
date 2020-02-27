const { qr } = require('./qr')

const A = [
    [-1, 2, 3],
    [2, -3, 5],
    [3, 5, -2]
]
console.log(qr(A))

const B = [
    [2, -1, 0],
    [-1, 2, -1],
    [0, -1, 2]
]
console.log(qr(B))