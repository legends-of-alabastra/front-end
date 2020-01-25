const canvas = document.getElementById('background')
const ctx = canvas.getContext('2d')

const player = {
    viewport: {height_px: 600, witdh_px: 800},
    coordinates: {x: 500, y: 500},
    zoom: 1,
    tile_size: 8,
}

const map = generate_map(tileset, universe_variables)
// console.log(map)

const draw_viewport = (player, map) => {
    const width_in_tiles = player.viewport.witdh_px / player.tile_size
    const height_in_tiles = player.viewport.height_px / player.tile_size
    map_coordinates = {
        x: player.coordinates.x - width_in_tiles / 2 < 0 ? 0 : Math.ceil(player.coordinates.x - width_in_tiles / 2),
        y: map_y_coord = player.coordinates.y - height_in_tiles / 2 < 0 ? 0 : Math.ceil(player.coordinates.y - height_in_tiles / 2)
    }
    console.log(width_in_tiles)
    console.log(map_coordinates)
}

const draw_map = (data, background_color = '#00f', pixel_size = 10, colors) => {
    const {tileset, map} = data
    console.log(data)
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

// draw_viewport(player, map)
draw_map(map, '#00f', 1, tileset.island.colors)