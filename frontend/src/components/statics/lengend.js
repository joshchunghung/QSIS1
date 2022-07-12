export function mlLegend (circleSize, dep, s100Color) {
    const element = document.getElementById('MLscale')
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

    const element2 = document.getElementById('depscale')
    while (element2.firstChild) {
        element2.removeChild(element2.firstChild)
    }

    const borderWidth = 10
    const mlMax = 7
    const mlMin = 3
    const svgWidth = (mlMax - mlMin) * circleSize + 4 * borderWidth
    const width = svgWidth * 4.5
    const dataset = [[mlMin, circleSize * 0.05, width / 6]]
    for (let i = mlMin + 1; i < mlMax + 1; i++) {
        const Num1 = i
        const Num2 = (i - mlMin) * circleSize + 0.1
        dataset.push([Num1, Num2, width / 6 * (i - mlMin + 1)]) // 兩個合併成一個陣列
    }

    const svg = d3.select('#MLscale').append('svg')
        .attr('width', width)
        .attr('height', svgWidth)
        .attr('font-family', '\'Roboto\', sans-serif')
        .attr('font-size', 15)
        .attr('text-anchor', 'middle')

    // M3
    svg.append('circle')
        .attr('cx', dataset[0][2] - 15)
        .attr('cy', svgWidth / 2)
        .attr('r', dataset[0][1])
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', 3)

    svg.append('text')
        .attr('x', dataset[0][2] - 14)
        .attr('y', svgWidth / 2 + 20)
        .attr('fill', 'black')
        .text('3-')

    // M4
    svg.append('circle')
        .attr('cx', dataset[1][2] - 40)
        .attr('cy', svgWidth / 2)
        .attr('r', dataset[1][1])
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
    svg.append('text')
        .attr('x', dataset[1][2] - 40)
        .attr('y', svgWidth / 2 + 5)
        .attr('fill', 'black')
        .text('4')

    // M5
    svg.append('circle')
        .attr('cx', dataset[2][2] - 50)
        .attr('cy', svgWidth / 2)
        .attr('r', dataset[2][1])
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
    svg.append('text')
        .attr('x', dataset[2][2] - 50)
        .attr('y', svgWidth / 2 + 5)
        .attr('fill', 'black')
        .text('5')

    // M6
    svg.append('circle')
        .attr('cx', dataset[3][2] - 55)
        .attr('cy', svgWidth / 2)
        .attr('r', dataset[3][1])
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', 3)

    svg.append('text')
        .attr('x', dataset[3][2] - 55)
        .attr('y', svgWidth / 2 + 5)
        .attr('fill', 'black')
        .text('6')

    // M7
    svg.append('circle')
        .attr('cx', dataset[4][2] - 50)
        .attr('cy', svgWidth / 2)
        .attr('r', dataset[4][1])
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
    svg.append('text')
        .attr('x', dataset[4][2] - 50)
        .attr('y', svgWidth / 2 + 5)
        .attr('fill', 'black')
        .text('7')

    svg.append('text')
        .attr('x', 12)
        .attr('y', svgWidth / 2 + 6)
        .attr('fill', 'black')
        .text('ML')

    // depth
    const depData = []
    const colorHeight = [12, 18, 24, 30, 50]
    const yAx = [12, 24, 42, 66, 96] // y-axis for rectangular
    const tAx = [24, 42, 66, 96, 145]// y-axis for text
    const count = s100Color.length - 1
    for (let i = 0; i < count; i++) {
        depData.push([dep[i], s100Color[i], colorHeight[i], yAx[i], tAx[i]])
    }
    depData.push(['300+', s100Color[count], colorHeight[count], yAx[count], tAx[count]])

    d3.select('#depscale').append('svg')
        .call(svg => {
            svg.attr('width', 100)
                .attr('height', 200)
                .attr('font-size', 14)
                .attr('font-family', '\'Roboto\', sans-serif')
                .attr('text-anchor', 'end')
                .attr('alignment-baseline', 'middle')

            svg
                .selectAll('g').data(depData).enter()
                .call(g => {
                    g.append('rect')
                        .attr('width', 12)
                        .attr('height', function (d) { return d[2] })
                        .attr('x', 50) // x
                        .attr('y', function (d) { return d[3] + 25 })
                        .attr('fill', function (d) { return d[1] })
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1)

                    g.append('text')
                        .attr('x', 48)
                        .attr('y', function (d) { return d[4] + 30 })
                        .attr('fill', 'black')
                        .text(function (d) { return d[0] })
                })
            svg.append('text')
                .attr('x', 85)
                .attr('y', 30)
                .attr('fill', 'black')
                .text('Depth (km)')
        })
}
