const canvas = document.getElementById('background')
const ctx = canvas.getContext('2d')

const decompress_tile = tile => {
    if(tile) {
        return tile.reduce((sum, tq) => {
            tq += ''
            if(tq.length < 16) tq = Array(17 - tq.length).join('0') + tq
            return sum + tq
        }, '').split('')
    }}

const draw_map = (data, background_color = '#00f', pixel_size = 10) => {
    const {tileset, map} = data
    console.log(tileset)
    console.log(map)
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
                draw_tile(ctx, coordinates, pixels_per_line, pixel_size, ['#000','#370','#130'], tile)
            }
            coordinates.x += pixels_per_line * pixel_size
        })
        coordinates.y += pixels_per_line * pixel_size
    })
}

const draw_tile = (ctx, coordinates, pixels_per_line, pixel_size, colors, data) => {
	for(let row=0; row<pixels_per_line; row++) {
		for(let col=0; col<pixels_per_line; col++) {
            const offset_x = col * pixel_size + coordinates.x
            const offset_y = row * pixel_size + coordinates.y
			if(data[row*pixels_per_line+col] != 0) {
				ctx.fillStyle = colors[data[row*pixels_per_line+col]-1] //minus 1 because 0 is assumed to be transparent
				ctx.fillRect(offset_x, offset_y, pixel_size, pixel_size)
            }
        }
	}
}

draw_map(generate_map(tileset, universe_variables), '#00f', 1)