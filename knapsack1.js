function lookback() {

}
function knapsack1(goods, maxWeight) {
    const n = goods.length
    const state = []
    state[0] = true
    state[goods[0].weight] = true
    for (let i = 1; i < n; ++i) {
        for (let j = maxWeight - goods[i].weight; j >= 0; --j) {
            if (state[j]) {
                state[j + goods[i].weight] = true
            }
        }
    }
    for (let i = maxWeight; i >= 0; --i) {
        if (state[i]) {
            return i
        }
    }
    return 0
}
function knapsack(goods, maxWeight) {
    const n = goods.length
    const state = [[]]
    state[0][0] = true
    state[0][goods[0].weight] = true
    for (let i = 1; i < n; ++i) {
        state[i] = []
        for (let j = 0; j <= maxWeight; ++j) {
            if (state[i - 1][j]) {
                if (j + goods[i].weight <= maxWeight) {
                    state[i][j + goods[i].weight] = true
                }
                state[i][j] = true
            }
        }
    }
    for (let i = maxWeight; i >= 0; --i) {
        if (state[n - 1][i]) {
            return i
        }
    }
}
const goods = [
    {
        weight: 1,
        value: 20
    },
    {
        weight: 30,
        value: 20
    },
    {
        weight: 2,
        value: 18
    },
    {
        weight: 30,
        value: 20
    },
]
const maxWeight = 10
console.log(
    knapsack(goods, maxWeight),
    knapsack1(goods, maxWeight)
)