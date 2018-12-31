function lookback(goods, maxWeight) {
    let result = 0
    let helper = (n, currentWeight, currentValue) => {
        if (n === goods.length) {
            if (currentValue > result) {
                result = currentValue
            }
            return
        }
        if (currentWeight + goods[n].weight <= maxWeight) {
            helper(n + 1, currentWeight + goods[n].weight, currentValue + goods[n].value)
        }
        helper(n + 1, currentWeight, currentValue)

    }
    helper(0, 0, 0)
    return result
}

function knapsack1(goods, maxWeight) {
    const weights = Object.values(goods).map(item => item.weight)
    const values = Object.values(goods).map(item => item.value)
    const n = goods.length
    const arr = [[]]
    arr[0][0] = 0
    if (weights[0] <= maxWeight) {
        arr[0][weights[0]] = values[0]
    }
    for (let i = 1; i < n; ++i) {
        arr[i] = []
        for (let j = 0; j <= maxWeight - weights[i]; ++j) {
            if (arr[i - 1][j] >= 0) {
                arr[i][j + weights[i]] = arr[i - 1][j] + values[i]
            }
        }
        for (let j = 0; j <= maxWeight; ++j) {
            if (arr[i - 1][j] >= 0) {
                arr[i][j] = Math.max(arr[i - 1][j], arr[i][j] || 0)
            }
        }
    }
    return arr[n - 1].reduce((max, current) => Math.max(max, current), 0)
}

function knapsack(goods, maxWeight) {
    const weights = Object.values(goods).map(item => item.weight)
    const values = Object.values(goods).map(item => item.value)
    const n = goods.length
    const arr = [[]]
    arr[0][0] = 0
    if (weights[0] <= maxWeight) {
        arr[0][weights[0]] = values[0]
    }
    for (let i = 1; i < n; ++i) {
        arr[i] = []
        for (let j = 0; j <= maxWeight - weights[i]; ++j) {
            if (arr[i - 1][j] >= 0) {
                arr[i][j + weights[i]] = arr[i - 1][j] + values[i]
            }
        }
        for (let j = 0; j <= maxWeight; ++j) {
            if (arr[i - 1][j] >= 0) {
                arr[i][j] = Math.max(arr[i - 1][j], arr[i][j] || 0)
            }
        }
    }
    return arr[n - 1].reduce((max, current) => Math.max(max, current), 0)
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
console.log(lookback(
    goods,
    maxWeight
), knapsack(
    goods,
    maxWeight
))