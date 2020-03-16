/**
 * 
 * @param {number[][]} matrix 
 */
function pca(matrix) {
    // 之前使用 /qr.js 进行计算
    // 这里为了代码可读性，统一进行了替换
    const { lambda, E } = window.numeric.eig(matrix)
    const vals = lambda.x
    const vectors = E.x

    const topKIndexes = getTopKIndexes(vals)
    const B = calcB(vals, topKIndexes)
    return math.multiply(
        math.multiply(vectors, B),
        math.inv(vectors)
    )
}
  
/**
 * 生成对角阵B
 * 
 * @param {number[]} vals 
 * @param {number[]} indexes
 * @return {number[][]}
 */
function calcB(vals, indexes) {
    const length = vals.length
    const matrix = []
    for (let i = 0; i < length; ++i) {
        matrix.push((new Array(length)).fill(0))
        if (indexes.includes(i)) {
            matrix[i][i] = vals[i]
        }
    }

    return matrix
}
  
/**
 * 返回前k个绝对值最大的特征量的下标
 * 
 * @param {number[]} vals 
 * @param {number} k 
 * @return {number[]}
 */
function getTopKIndexes(vals, k = window.TOP_K) {
    const length = vals.length
    if (!length) {
        return []
    }

    const logs = vals.map((val, index) => ({val: Math.abs(val), index}))
    // const logs = vals.map((val, index) => ({val, index}))
    logs.sort((a, b) => b.val - a.val)

    // const sortedVals = []
    // vals.forEach(val => {
    //     let isNegative = val < 0
    //     val = Math.abs(val)
    //     val = Math.round(val * 100) / 100 // 保留2位小数点
    //     sortedVals.push(
    //         isNegative 
    //             ? -1 * val
    //             : val
    //     )
    // })
    // console.log(sortedVals.join(','))

    const topKLogs = logs.slice(0, k)
    return topKLogs.map(log => log.index)
}
  
/**
 * 
 * @param {number[][]} vectors 
 * @param {number[]} indexes
 * @return {[number[][]} 
 */
function calcQ(vectors, indexes) {
    const length = vectors.length
    const t = []

    for (let i = 0; i < length; ++i) {
        t.push([])
        for (let j = 0; j < length; ++j) {
            t[i][j] = 0
        }
    }
    
    for (const index of indexes) {
        for (let row = 0; row < length; ++row) {
            t[row][index] = vectors[row][index]
        }
    }

    return t
}