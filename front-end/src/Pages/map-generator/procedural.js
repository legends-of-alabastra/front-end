const universe_variables = {
    min_tiles_from_edge: 3,
    map_width: 200,
    map_height: 200,
    chance_of_island_expansion: 55,
    map_coverage: 20,
    max_island_width: 500,
    max_island_height: 500,
    min_island_width: 20,
    min_island_height: 20,
}

const add_isle_to_map = (map, island) => {
    const island_height = island.length
    const island_width = island[0].length
    const map_height = map.length
    const map_width = map[0].length
    let start_x = Math.floor(Math.random()*(map_width-island_width))
    let start_y = Math.floor(Math.random()*(map_height-island_height))
    const max_tries = 1000
    let can_add = true
    let island_size = 0
    
    for(let tries=0; tries<max_tries; tries++) {
        for(let row=start_y; row<start_y+island_height; row++) {
            for(let col=start_x; col<start_x+island_width; col++) {
                if(island[row-start_y][col-start_x]) island_size++
                if(map[row][col] && island[row-start_y][col-start_x]) {
                    can_add = false
                    break
                }
            }
            if(!can_add) break
        }
        if(can_add) break
        island_size = 0
    }

    if(can_add) {
        for(let row=start_y; row<start_y+island_height; row++)
            for(let col=start_x; col<start_x+island_width; col++)
                if(island[row-start_y][col-start_x])
                    map[row][col] = island[row-start_y][col-start_x]
        return island_size
    } else return 0
}

const add_to_tileset = (tileset, new_tile) => {
    let index = null
    for(tileset_idx=0; tileset_idx<tileset.length; tileset_idx++) {
        if(JSON.stringify(tileset[tileset_idx]) === JSON.stringify(new_tile)) {
            index = tileset_idx; break
        }
    }
    if(index === null || tileset.length === 0) {
        index = tileset.length
        tileset.push(new_tile)
    }
    return index
}

const generate_map = (tileset, config) => {
    // const num_of_islands = Math.floor(config.map_width * config.map_height * config.island_tile_ratio)
    let island_tileset = []
    let map = []
    let map_coverage = 0
    for(let row=0;row<config.map_height;row++) map[row] = new Array(config.map_width).fill(null)

    console.log('...generating islands')
    while(map_coverage<config.map_height*config.map_width*(config.map_coverage/100)) {
        const island = generate_island(config, tileset, island_tileset)
        // console.log(island)
        //add island_tileset to map_tileset

        //add island to map
        map_coverage += add_isle_to_map(map, island)
    }
    
    //to optimiize this move it to island tiles
    console.log('...creating tileset')
    for(let row=0; row<map.length; row++) {
        for(let col=0; col<map[0].length; col++) {
            map[row][col] = add_to_tileset(island_tileset, map[row][col])
        }
    }

    console.log('...drawing map')


    return {tileset: island_tileset, map: map}
    // console.log(map)
}