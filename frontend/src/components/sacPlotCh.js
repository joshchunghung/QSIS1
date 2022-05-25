export const floatCalculate = (method, ...theArgs) => {
    let result
    function isFloat(n) {
        return n.toString().indexOf('.') >= 0
    }

    const powerArr = []
    theArgs.forEach(d => {
        if (isFloat(d)) {
            powerArr.push(d.toString().split('.')[1].length)
        } else { powerArr.push(0) }
    })
    const maxPower = Math.max(...powerArr)
    // console.debug(maxPower);
    const newArgs = theArgs.map((d, i) => parseInt(d.toString().replace('.', '')) * Math.pow(10, (maxPower - powerArr[i])))
    // console.debug(newArgs);
    switch (method) {
        case 'add':
            result = 0
            newArgs.forEach(d => result += d)
            result /= Math.pow(10, maxPower)
            break
        case 'minus':
            result = newArgs[0] * 2
            newArgs.forEach(d => result -= d)
            result /= Math.pow(10, maxPower)
            break
        case 'times':
            result = 1
            newArgs.forEach(d => result *= d)
            result /= Math.pow(Math.pow(10, maxPower), newArgs.length)
            break
        case 'divide':
            result = Math.pow(newArgs[0], 2)
            newArgs.forEach((d, i) => {
                if (!(result == 0 && i == 0)) { result /= d }
            })
            // console.debug(result);
            result *= Math.pow(Math.pow(10, maxPower), newArgs.length - 2)
            break
        default:
            result = 0
            newArgs.forEach(d => result += d)
            result /= Math.pow(10, maxPower)
            break
    }
    return result
}

export const getLineColor = (index) => {
    switch (index % 6) {
        case 0:
            return 'steelblue'
        case 1:
            return '#AE0000'
        case 2:
            return '#006030'
        case 3:
            return '#EA7500'
        case 4:
            return '#4B0091'
        case 5:
            return '#272727'
        default:
            return 'steelblue'
    }
}

export const getMargin = (tickLength = 5) => {
    let left
    if (tickLength >= 10) { left = 100 } else if (tickLength >= 6) { left = 75 } else { left = 50 }
    return ({
        top: 20,
        right: 30,
        bottom: 30,
        left: left
    })
}


export const toScientificNotation = (number, maxIndex = undefined) => {
    // console.debug(number);
    let singed, numberAbs
    if (number < 0) {
        singed = true
        numberAbs = Math.abs(number)
    } else {
        singed = false
        numberAbs = number
    }
    // maxIndex 轉成指定10的次方
    if (maxIndex || maxIndex == 0) {
        const index = number == 0 ? 0 : maxIndex
        const constant = floatCalculate('divide', numberAbs, Math.pow(10, index)) * (singed ? -1 : 1)
        // let constant = numberAbs / Math.pow(10, index) * (singed ? -1 : 1);
        // console.debug(constant, index);
        return [constant, index]
    } else
        if (numberAbs >= 10) {
            const intLength = Math.floor(numberAbs).toString().length
            const index = intLength - 1
            const constant = numberAbs / Math.pow(10, index) * (singed ? -1 : 1)
            // console.debug(constant, index);
            return [constant, index]
        }
        // tickRange < 1
        else if (numberAbs > 0 && numberAbs < 1) {
            let constant = numberAbs
            let index = 0
            while (constant < 0.1) {
                constant *= 10
                index--
            }
            constant *= (singed ? -1 : 1)
            // console.debug(constant, index);
            return [constant, index]
        } else { return [number, 0] }
}

