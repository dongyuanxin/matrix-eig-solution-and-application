const {
    calcEigvals,
    calc2DimMatrix,
    calc3DimMatrix,
    calc4DimMatrix
} = require('./lower-order-matrix')

// console.log(calcEigvals(
//     [
//         [3, -1],
//         [-1, 3]
//     ]
// ))

console.log(calc3DimMatrix(
    [
        [1, -3, 3],
        [3, -5, 3],
        [6, -6, 4]
    ]
))

// console.log(calc4DimMatrix(
//     [
//         [0, 1, 1, 1],
//         [1, 0, 1, 1],
//         [1, 1, 0, 1],
//         [1, 1, 1, 0]
//     ]
// ))