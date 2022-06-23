function setVector (lon, lat, ve, vn, site, map, color, am) { // ve east direction +, vn north direction +; am:�𦆮憭批�滨��
    ve = parseFloat(ve)
    vn = parseFloat(vn)

    let total_length = Math.sqrt((ve * ve) + (vn * vn)) * am
    const angle = calAngle(ve, vn)
    // console.log("site="+site+"  vn="+vn+"ve="+ve+"length="+total_length+" angle="+angle);
    if (total_length > 7) {
        var length = total_length - 7
        var arrowSvgString = '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + total_length + '\' height=\'6\'>	<path d=\'M0 3 H' + length + ' M' + length + ' ,0 L' + length + ',6 L' + total_length + ',3 z\' stroke=\'' + color + '\' fill=\'' + color + '\'></path></svg>'
    } else {
        var length = 0
        total_length = 7
        // var arrowWidth=3*total_length/7;
        // var totalArrowWidth=arrowWidth*2;
        const arrowWidth = 3
        const totalArrowWidth = 6
        var arrowSvgString = '<svg xmlns=\'http://www.w3.org/2000/svg\' stroke-width=\'2\' width=\'' + total_length + '\' height=\'6\'>	<path d=\'M' + length + ' ,0 L' + length + ',' + totalArrowWidth + ' L' + total_length + ',' + arrowWidth + ' z\' stroke=\'' + color + '\' fill=\'' + color + '\'></path></svg>'
    }
    // var arrowSvgString = "<svg xmlns='http://www.w3.org/2000/svg' width='"+total_length+"' height='6'>	<path d='M0 3 H"+length+" M"+length+" ,0 L"+length+",6 L"+total_length+",3 z' stroke='"+color+"' fill='"+color+"'></path></svg>";
    const myArrowIconUrl = encodeURI('data:image/svg+xml,' + arrowSvgString).replace(/#/gi, '%23')
    const arrowIcon = L.Icon.extend({
        options: {
            iconSize: [60, 6],
            iconAnchor: [0, 3],
            popupAnchor: [0, 3]
        }
    })
    const arrow = new arrowIcon({
        iconUrl: myArrowIconUrl,
        iconSize: [length, 6]
    })
    const puptext = ''
    const html = '測站:' + site + '</br> Un:' + vn + 'mm/yr </br>Ue:' + ve + 'mm/yr'
    const arrowMarker = L.marker([lat, lon], {
        icon: arrow,
        rotationAngle: angle
    }).bindPopup(html)

    return arrowMarker
}
