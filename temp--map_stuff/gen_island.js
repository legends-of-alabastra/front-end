const island_grow = (island, coordinates, chance_of_expansion) => {
    if(coordinates.y === 0 || coordinates.y === island.length-1 || coordinates.x === 0 || coordinates.x === island[0].length-1) island[coordinates.y][coordinates.x] = 2
    else island[coordinates.y][coordinates.x] = 1
    //north
    if(island[coordinates.y-1] && island[coordinates.y-1][coordinates.x] === 0) {
        if(Math.floor(Math.random()*(100/chance_of_expansion)) > 0 || coordinates.y-1 === 0) island[coordinates.y-1][coordinates.x] = 2
        else island_grow(island, {x: coordinates.x, y: coordinates.y-1}, chance_of_expansion)
    }
    //east
    if(island[coordinates.y][coordinates.x+1] === 0) {
        if(Math.floor(Math.random()*(100/chance_of_expansion)) > 0 || coordinates.x+1 === island[0].length) island[coordinates.y][coordinates.x+1] = 2
        else island_grow(island, {x: coordinates.x+1, y: coordinates.y}, chance_of_expansion)
    }
    //south
    if(island[coordinates.y+1] && island[coordinates.y+1][coordinates.x] === 0) {
        if(Math.floor(Math.random()*(100/chance_of_expansion)) > 0 || coordinates.y+1 === 0) island[coordinates.y+1][coordinates.x] = 2
        else island_grow(island, {x: coordinates.x, y: coordinates.y+1}, chance_of_expansion)
    }
    //west
    if(island[coordinates.y][coordinates.x-1] === 0) {
        if(Math.floor(Math.random()*(100/chance_of_expansion)) > 0 || coordinates.x-1 === island[0].length) island[coordinates.y][coordinates.x-1] = 2
        else island_grow(island, {x: coordinates.x-1, y: coordinates.y}, chance_of_expansion)
    }
}

//random tiles are strings ???
//copy consolelog for west on all other directions
const get_shore_tile = (island, col, row) => {
    //get surroundings
    if(island[row-1] && island[row-1][col] === 0 || !island[row-1]) {
        if(!island[row][col-1]) return get_random_element(tileset.island.corner) //northwest
        else if(!island[row][col+1]) return rotate_tile(get_random_element(tileset.island.corner), 90) //northeast
        else return get_random_element(tileset.island.side) //north
    }
    else if(island[row+1] && island[row+1][col] === 0 || !island[row+1]) {
        if(!island[row][col-1]) return rotate_tile(get_random_element(tileset.island.corner), 270) //southwest
        else if(!island[row][col+1]) return rotate_tile(get_random_element(tileset.island.corner), 180) //southeast
        else return rotate_tile(get_random_element(tileset.island.side), 180) //south
    }
    else if(!island[row][col-1]) return rotate_tile(get_random_element(tileset.island.side), 270) //west
    else if(!island[row][col+1]) return rotate_tile(get_random_element(tileset.island.side), 90) //east
    return get_random_element(tileset.island.inland)
}

const island_tiles = island => {
    for(let row=0; row<island.length; row++) {
        for(let col=0; col<island[0].length; col++) {
            const tile_type = island[row][col]
            if(tile_type === 1) island[row][col] = get_random_element(tileset.island.mainland)
            if(tile_type === 2) {
                test = get_shore_tile(island, col, row)
                island[row][col] = test
            }
        }
    }
}

const trim_array = island => {
    //trim rows
    island = island.filter(row => row.reduce((prev, cur) => prev+cur, 0))
    //trim columns
    let min=island[0].length; let max=0
    for(let row=0; row<island.length; row++) {
        for(let col=0; col<island[row].length; col++) {
            if(island[row][col]) {
                if(col < min) min = col
                break
            }
        }
        for(let col=island[row].length-1; col>=0; col--) {
            if(island[row][col]) {
                if(col > max) max = col
                break
            }
        }
    }
    return island.map(row => row.slice(min, max+1))
}

const island_cleanup = island => {
    for(let row=0; row<island.length; row++) {
        for(let col=0; col<island[0].length; col++) {
            if(island[row][col] === 2) {
                let total = 0
                if(island[row-1] && island[row-1][col-1] == 1) total++
                if(island[row-1] && island[row-1][col] == 1) total++
                if(island[row-1] && island[row-1][col+1] == 1) total++
                if(island[row][col-1] == 1) total++
                if(island[row][col+1] == 1) total++
                if(island[row+1] && island[row+1][col-1] == 1) total++
                if(island[row+1] && island[row+1][col] == 1) total++
                if(island[row+1] && island[row+1][col+1] == 1) total++
                if(total >= 4) island[row][col] = 1
            }
            if(island[row][col] === 1) {
                //check all adjacent edges, if 0, change it to 2
                if(island[row-1][col-1] == 0) island[row-1][col-1] = 2
                if(island[row-1][col] == 0) island[row-1][col] = 2
                if(island[row-1][col+1] == 0) island[row-1][col+1] = 2
                if(island[row][col-1] == 0) island[row][col-1] = 2
                if(island[row][col+1] == 0) island[row][col+1] = 2
                if(island[row+1][col-1] == 0) island[row+1][col-1] = 2
                if(island[row+1][col] == 0) island[row+1][col] = 2
                if(island[row+1][col+1] == 0) island[row+1][col+1] = 2
            }
        }
    }
}

const generate_island = (config) => {
    //create 2d array
    island = []
    for(let row=0;row<config.max_island_height; row++) island[row] = new Array(config.max_island_width).fill(0)
    let coordinates = {x: Math.floor(config.max_island_width/2), y: Math.floor(config.max_island_height/2)}

    //create island
    while(true) {
        island = []
        for(let row=0;row<config.max_island_height; row++) island[row] = new Array(config.max_island_width).fill(0)
        let coordinates = {x: Math.floor(config.max_island_width/2), y: Math.floor(config.max_island_height/2)}
        island_grow(island, coordinates, config.chance_of_island_expansion)
        
        //trim 2d array down to size
        island = trim_array(island)
        
        //if island fits size requirements, move on
        if(island.length > config.min_island_height && island[0].length > config.min_island_width) break
    }

    //clean up island
    island_cleanup(island)

    //add tile references
    island_tiles(island)

    return island
}