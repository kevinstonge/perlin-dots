function generateDots(options = { xDots: 10, yDots: 10, width: 100, height: 100}) {
    const { xDots, yDots, width, height } = options;
    const dots = [];
    for (let x = 0; x <= xDots; x++) {
        for (let y = 0; y <= yDots; y++) {
            dots.push({x: width*x/xDots, y: height*y/yDots, z:0, h: 260, s:50, l:50, size: 2});
        }
    }
    return dots;
}
export default generateDots;