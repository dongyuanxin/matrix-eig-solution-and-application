const math = require('mathjs')
const { fanMi } = require('./fan-mi')

console.log(fanMi(
    [
        [2, -1, 0],
        [-1, 2, -1],
        [0, -1, 2]
    ]
))

console.log('>>> 新一个矩阵')
const A2 = [
    [2, -3, 1],
    [-1, 0, -1],
    [0,-2, 1]
]
console.log(fanMi(A2))
console.log('<<< 根据定义验证')
const X2 = [1, 0, -0.9999988746250363]
const a2 = 0.9999995725873887
console.log(math.multiply(A2, X2))
console.log(math.multiply(a2, X2))

console.log('>>> 新一个矩阵')
const A3 = [
    [-1, 2, 3],
    [2, -3, 5],
    [4, 3, -5]
]
console.log(fanMi(A3))
console.log('<<< 根据定义验证')
const X3 = [1, 0.957116028766076, 0.8204132537278284]
const a3 = 3.3754718187156376
console.log(math.multiply(A3, X3))
console.log(math.multiply(a3, X3))