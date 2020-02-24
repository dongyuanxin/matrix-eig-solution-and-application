const math = require('mathjs')

/**
 * 乘幂法求特征值和特征矩阵 
 * 测试数据：http://blog.csdn.net/qq1195365047/article/details/88703128
 * @param {Array} matrix 矩阵
 * @param {Number} maxItrs 最大迭代次数
 * @param {Number} minError 误差限
 */
function chengMi(matrix, maxItrs = 500, minError = 1e-6) {
    matrix = math.matrix(matrix) // Array Type => Matrix Type
  
    let k = 0 // 迭代次数
    const dimension = math.size(matrix)._data[0] // 矩阵维度
    let u = math.reshape(math.ones(dimension), [dimension, 1]) // 初始向量(已转置)
    let m = math.max(math.abs(u)) // 按模的最大分量
  
    while (k++ < maxItrs) {
        let x = math.divide(u, m) // x(k)
        u = math.multiply(matrix, x) // u(k + 1)

        let lastM = m // m(k)
        m = math.max(math.abs(u)) // m(k + 1)
        if (math.abs(lastM - m) < minError) {
            return [m, math.divide(u, m)._data, k]
        }
    }
  
    return [null, null, null]
}

module.exports.chengMi = chengMi

