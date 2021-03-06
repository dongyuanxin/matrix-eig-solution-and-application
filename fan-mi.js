const math = require('mathjs')

/**
 * 返回最大值与下标记
 * 
 * @param {Matrix} matrix 
 * @param {number[]}
 */
function maxWithIndex(matrix) {
    const arr = matrix._data // size: [n, 1]
    let index = 0, max = arr[0][0]
    arr.forEach((value, i) => {
      if (value[0] > max) {
        index = i
        max = value[0]
      }
    })
  
    return [max, index]
  }

/**
 * 反幂法
 * 测试数据：http://blog.csdn.net/qq1195365047/article/details/88703128
 * @param {Array} matrix 矩阵
 * @param {Number} maxItrs 最大迭代次数
 * @param {Number} minError 误差限
 */
function fanMi(matrix, maxItrs = 500, minError = 1e-6) {
    matrix = math.matrix(matrix) // Array Type => Matrix Type
    const dimension = math.size(matrix)._data[0] // 矩阵维度
  
    let k = 0, // 迭代次数
        u = math.reshape(math.ones(dimension), [dimension, 1]), // 初始向量(已转置)
        m = 0

    while (k < maxItrs) {
        let v = math.multiply(math.inv(matrix), u)
        let lastM = m
        m = math.max(math.abs(v))
        u = math.divide(v, m)
        // let [_, index] = maxWithIndex(math.abs(v))
        // m = v._data[index][0]
        // u = math.divide(v, m)

        if (math.abs(lastM - m) < minError) {
            return [m, u._data, k]
        }
        m = 1 / m
        k += 1
    }
  
    return [m, u._data, k]
}

module.exports.fanMi = fanMi
