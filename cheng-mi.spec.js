const { chengMi } = require('./cheng-mi')

// 输出矩阵A的特征值、特征向量和迭代次数
const A = [
    [-4, 14, 0],
    [-5, 13, 0],
    [-1, 0, 2]
]
console.log(chengMi(A))