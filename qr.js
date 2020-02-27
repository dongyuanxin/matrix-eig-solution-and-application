const math = require('mathjs')

/**
 * QR分解法
 * link：https://blog.csdn.net/cinmyheart/article/details/44086369
 * 
 * @param {Array} matrix 
 * @param {Number} eps 
 */
function qr(matrix, eps = 1e-4) {
    matrix = math.matrix(matrix)
    const dimension = math.size(matrix)._data[0]
    let tag = true
    // 步骤1:进行QR分解
    while(tag) {
        const {Q, R} = math.qr(matrix)
        matrix = math.multiply(R, Q)
        
        for (let k = dimension - 2; k >= 0; --k) {
            if (math.abs(matrix.subset(math.index(k + 1, k))) < eps) {
                tag = false
                break
            }
        }
    }
    // 步骤2:对角元上的元素就是矩阵的全部特征值
    const eigVals = []
    for (let i = 0; i < dimension; ++i) {
        for (let j = 0; j < dimension; ++j) {
            (i === j) && eigVals.push(matrix.subset(math.index(i, j)))
        }
    }

    return eigVals
}

module.exports.qr = qr