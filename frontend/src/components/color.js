const colorTable = [[0, 255, 255, 255],
[0.8, 227, 255, 227],
[1.25, 136, 255, 136],
[1.5, 28, 255, 28],
[2, 108, 255, 0],
[2.5, 255, 255, 0],
[8, 255, 170, 0],
[25, 255, 90, 0],
[80, 255, 36, 0],
[140, 245, 0, 0],
[200, 186, 0, 0],
[250, 153, 12, 51],
[440, 153, 44, 178],
[600, 153, 41, 165],
[800, 153, 51, 204]]

export function pgaColor(Type, stations, floor = 0) {
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
