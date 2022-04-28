const colorTable = [[1, 255, 255, 255],
    [1.5, 227, 255, 227],
    [2, 136, 255, 136],
    [2.5, 28, 255, 28],
    [3, 108, 255, 0],
    [3.5, 255, 255, 0],
    [4, 255, 170, 0],
    [4.5, 255, 90, 0],
    [5, 255, 36, 0],
    [5.5, 245, 0, 0],
    [6, 186, 0, 0],
    [6.5, 153, 12, 51],
    [7, 153, 44, 178],
    [7.5, 153, 41, 165],
    [8, 153, 51, 204]]

export function pgaColor (Type, stations, floor = 0) {
    let maxPga = -1
    switch (Type) {
    case 'maxPGA':
        stations
            .filter((item) => item.floor === floor)
            .forEach((sta) => {
                if (sta.pga3comp > maxPga) {
                    maxPga = sta.pga3comp
                }
            })
        break
    case 'station':
        maxPga = stations.pga3comp ? stations.pga3comp : -1
        break
    default:
        return 'grey'
    }

    if (maxPga === -1) {
        return 'grey'
    } else {
        const colorArray = colorTable.filter((item) => item[0] <= maxPga)
        const [_, ...targetColor] = colorArray[colorArray.length - 1]
        return `rgb(${targetColor})`
    }
}
