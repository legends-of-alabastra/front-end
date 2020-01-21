const canvas = document.getElementById('background')
const ctx = canvas.getContext('2d')

const draw_map = (data, background_color = '#00f', pixel_size = 10, colors) => {
    const {tileset, map} = data
    const height = map.length * 8 * pixel_size
    const width = map[0].length * 8 * pixel_size
    ctx.fillStyle = background_color
    ctx.fillRect(0,0,width,height)
    const pixels_per_line = 8 //need a way not to hardcode this
    let coordinates = {x: 0, y: 0}

    map.forEach(row => {
        coordinates.x = 0
        row.forEach(col => {
            if(col) {
                tile = decompress_tile(tileset[col])
                draw_tile(ctx, coordinates, pixel_size, colors, tile)
            }
            coordinates.x += pixels_per_line * pixel_size
        })
        coordinates.y += pixels_per_line * pixel_size
    })
}

const draw_tile = (ctx, coordinates, pixel_size, colors, data) => {
    data.forEach((color_row, row) => {
        const offset_x = row * pixel_size + coordinates.y
        color_row.forEach((color, col) => {
            const offset_y = col * pixel_size + coordinates.x
            if(color != 0) {
                ctx.fillStyle = colors[color]
                ctx.fillRect(offset_y, offset_x, pixel_size, pixel_size)
            }
        })    
    })
}

draw_map(generate_map(tileset, universe_variables), '#00f', 1, tileset.island.colors)