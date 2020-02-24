const nerdamer = require('nerdamer/nerdamer.core')
require('nerdamer/Algebra')
require('nerdamer/Calculus')
require('nerdamer/Solve')

// const x = nerdamer.solve('x - 2 = 0', 'x')
// console.log(x.toString())

/**
 * 
 * @param {number[][]} matrix 
 * @return {string}
 */
function calcEigvals(matrix) {
    if (
        !matrix 
        || !Array.isArray(matrix) 
        || matrix.length < 1
        || matrix.length !== matrix[0].length
    ) {
        throw new Error('Param is unvalid')
    }

    try {
        if (matrix.length === 2) {
            return calc2DimMatrix(matrix)
        } else if (matrix.length === 3) {
            return calc3DimMatrix(matrix)
        } else if (matrix.length === 4) {
            return calc4DimMatrix(matrix)
        }
    } catch (error) {
        throw new Error('矩阵不存在特征值')
    }
}   

/**
 * 
 * @param {number[][]} matrix 
 * @return {string}
 */
function calc2DimMatrix(matrix) {
    const a = 1
    const b = -1 * (matrix[0][0] + matrix[1][1])
    const c = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    const x = nerdamer.solve(`(${a})*x^2 + (${b})*x + (${c}) = 0`, 'x')
    return x.toString()
}

/**
 * @param {number[][]} matrix 
 * @return {string}
 */
function calc3DimMatrix(matrix) {
    const det = `${mat2Str(matrix, 0, 0)} * ${mat2Str(matrix, 1, 1)} * ${mat2Str(matrix, 2, 2)}`
    + ` + ${mat2Str(matrix, 0, 1)} * ${mat2Str(matrix, 1, 2)} * ${mat2Str(matrix, 2, 0)}`
    + ` + ${mat2Str(matrix, 0, 2)} * ${mat2Str(matrix, 1, 0)} * ${mat2Str(matrix, 2, 1)}`
    + ` - ${mat2Str(matrix, 0, 2)} * ${mat2Str(matrix, 1, 1)} * ${mat2Str(matrix, 2, 0)}`
    + ` - ${mat2Str(matrix, 0, 0)} * ${mat2Str(matrix, 1, 2)} * ${mat2Str(matrix, 2, 1)}`
    + ` - ${mat2Str(matrix, 0, 1)} * ${mat2Str(matrix, 1, 0)} * ${mat2Str(matrix, 2, 2)}`

    const x = nerdamer.solve(`${det} = 0`, 'x')
    return x.toString()
}

/**
 * @param {number[][]} matrix
 * @return {string} 
 */
function calc4DimMatrix(matrix) {
    const m1 = [
        [matrix[1][1], matrix[1][2], matrix[1][3]],
        [matrix[2][1], matrix[2][2], matrix[2][3]],
        [matrix[3][1], matrix[3][2], matrix[3][3]],
    ]
    const m2 = [
        [matrix[0][1], matrix[0][2], matrix[0][3]],
        [matrix[2][1], matrix[2][2], matrix[2][3]],
        [matrix[3][1], matrix[3][2], matrix[3][3]],
    ]
    const m3 = [
        [matrix[0][1], matrix[0][2], matrix[0][3]],
        [matrix[1][1], matrix[1][2], matrix[1][3]],
        [matrix[3][1], matrix[3][2], matrix[3][3]],
    ]
    const m4 = [
        [matrix[0][1], matrix[0][2], matrix[0][3]],
        [matrix[1][1], matrix[1][2], matrix[1][3]],
        [matrix[2][1], matrix[2][2], matrix[2][3]],
    ]
    const det = `(${matrix[0][0]}) * (${threeDim2Str(m1)}) - (${matrix[1][0]}) * (${threeDim2Str(m2)}) + (${matrix[2][0]}) * (${threeDim2Str(m3)}) - (${matrix[3][0]}) * (${threeDim2Str(m4)})`
    const x = nerdamer.solve(`${det} = 0`, 'x')
    return x.toString()
}

/**
 * @param {number[][]} matrix 
 * @param {number} i 
 * @param {number} j 
 * @return {string}
 */
function mat2Str(matrix, i, j) {
    if (i === j) return `(x - (${matrix[i][i]}))`
    return `(-(${matrix[i][j]}))`
}

/**
 * @param {number[][]} matrix 
 */
function threeDim2Str(matrix) {
    return `${mat2Str(matrix, 0, 0)} * ${mat2Str(matrix, 1, 1)} * ${mat2Str(matrix, 2, 2)}`
    + ` + ${mat2Str(matrix, 0, 1)} * ${mat2Str(matrix, 1, 2)} * ${mat2Str(matrix, 2, 0)}`
    + ` + ${mat2Str(matrix, 0, 2)} * ${mat2Str(matrix, 1, 0)} * ${mat2Str(matrix, 2, 1)}`
    + ` - ${mat2Str(matrix, 0, 2)} * ${mat2Str(matrix, 1, 1)} * ${mat2Str(matrix, 2, 0)}`
    + ` - ${mat2Str(matrix, 0, 0)} * ${mat2Str(matrix, 1, 2)} * ${mat2Str(matrix, 2, 1)}`
    + ` - ${mat2Str(matrix, 0, 1)} * ${mat2Str(matrix, 1, 0)} * ${mat2Str(matrix, 2, 2)}`
}

module.exports.calcEigvals = calcEigvals

module.exports.calc2DimMatrix = calc2DimMatrix

module.exports.calc3DimMatrix = calc3DimMatrix

module.exports.calc4DimMatrix = calc3DimMatrix

