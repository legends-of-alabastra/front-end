const decompress_tile = (tile) => {
    tile = tile.reduce((sum, row) => {
        if(row.toString().length < 16) return sum+Array(17-row.toString().length).join('0') + row.toString()
        return sum+row.toString()
    }, '').split('').map(val => parseInt(val))
    const tile_width = Math.sqrt(tile.length)
    let new_tile = []
    for(let row=0; row<tile_width; row++) new_tile.push(tile.splice(0,tile_width))
    return new_tile
}
const draw_tile = (ctx, coordinates, colors, tile) => {
    tile.forEach((color_row, row) => {
        const offset_x = row * 1 + coordinates.y
        color_row.forEach((color, col) => {
            const offset_y = col * 1 + coordinates.x
            if(color !== 0) {
                ctx.fillStyle = colors[color]
                ctx.fillRect(offset_y, offset_x, 1, 1)
            }
        })
    })
}
export default (map, tileset, colors) => {
    if(!map || !map.length) return null
    const {window_width, window_height} = {window_width: window.innerWidth, window_height: window.innerHeight}
    let {x, y} = {x: 0, y: 0}
    const canvas = document.getElementById('map')
    const ctx = canvas.getContext('2d')
    const screen_width_in_tiles = Math.ceil(window_width / 8)
    const screen_height_in_tiles = Math.ceil(window_height / 8)
    ctx.canvas.width = map[0].length*8
    ctx.canvas.height = map.length*8
    //draw water (it's just blue)
    ctx.fillStyle = '#00f'
    ctx.fillRect(0,0,map[0].length*8, map.length*8)

    //player tile location in map
    // const start_col_tile = Math.max(Math.ceil((2*x-window_width)/16),0)
    // const start_row_tile = Math.max(Math.ceil((2*y-window_height)/16),0)

    for(let row=0; row<=map.length-1; row++) {
        x = 0
        for(let col=0; col<=map[0].length-1; col++) {
            if(map[row][col] !== 0) {
                const tile = decompress_tile(tileset[map[row][col]])
                draw_tile(ctx, {x:x,y:y}, colors, tile)
            }
            x += 8
        }
        y += 8
    }
}