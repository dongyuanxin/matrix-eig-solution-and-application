// 测试收敛速度和运行时间
// node benchmark/convergence.js >> benchmark/convergence.result.txt

const { chengMi } = require('./../cheng-mi')
const { fanMi } = require('./../fan-mi')

console.log((new Date()).toTimeString())

const A = [
    [2, -3, 1],
    [-1, 0, -1],
    [0,-2, 1]
]
const times = 100

console.log(`乘幂法迭代次数是：${chengMi(A)[2]}`)
console.log(`反幂法迭代次数是：${fanMi(A)[2]}`)

console.time('乘幂法')
for (let i = 0; i < times; ++i) {
    chengMi(A)
}
console.timeEnd('乘幂法')

console.time('反幂法')
for (let i = 0; i < times; ++i) {
    fanMi(A)
}
console.timeEnd('反幂法')
console.log()