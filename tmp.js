const math = require('mathjs')

const q = [
    [0.5287, -0.8430, 0.0991],
    [0.5524, 0.4304, 0.7139],
    [0.6445, 0.3226, -0.6932]
]

const a = [
    [4.7470, 0, 0],
    [0, -3.1692, 0],
    [0, 0, -7.5778]
]

console.log(
    math.multiply(
        math.multiply(q, a),
        math.inv(q)
    )
)