const tileset = {
    island: {
        colors: ['#000','#cf9','#9c3','#993','#360','#030','#fc9','#c96'],
        inland: [
            [614444473444444,3444444344344444,4444444444444444,4344444444434444],
            [734444463444443,2444444444434444,4444444443444444,4444444444443444],
            [724444473444434,2444444444443444,4444444444344444,4444444444444344],
            [624444463444444,3444343444444444,4444444444444444,4434434444444444]
        ],
        side: [
            [760000067767766,2327727732332323,4344323234343333,4343443344443344],
            [22232,6222342234344444,4434344443444444,4444444444444443],
            [26000000,4120000624112061,4434161434424442,4444444443444444],
            [77,2000733320033434,4333444444444444,4444444444444443],
            [67760000,7337233032443333,4344444344444443,4344443444444443],
        ],
        corner: [
            [0,67600006727,6722300072333,62323400672343],
            [0,7600000067,3300060673,62673400672343],
            [600,66676600677326,673223207322344,673244300673244],
            [0,6600000777,632300006244,7244300673244]
        ],
        mainland: [
            [4444444444444444,4444444343444344,4444444444444444,4334443444444344],
            [4444443444434344,4444444444344444,3444444444344444,4344443444344444],
            [4444434443444443,4444444444444444,4444344444444444,4444444433444444],
            [6444444444444444,4444444444443444,3444444444444444,4344444444444444],
            [4423335423334445,3344444434444444,3434444443434444,4444442322433333],
            [4444444454444444,5554443355555333,4444444323355544,3344455444444455],
            [3333333344444455,3344233344233344,4233344433333444,4444333344344434],
            [4444445544433444,5544334345544434,4455544444555554,4555554444433343]
        ]
    }
}

const universe_variables = {
    min_tiles_from_edge: 3,
    map_width: 600,
    map_height: 400,
    chance_of_island_expansion: 55,
    map_coverage: 20,
    max_island_width: 500,
    max_island_height: 500,
    min_island_width: 20,
    min_island_height: 20,
}

const compress_tile = tile => {
    let compressed_tile = []
    tile = tile.reduce((arr, row) => arr.concat(row), [])
    while(tile.length) compressed_tile.push(parseInt(tile.splice(0,16).join('')))
    return compressed_tile
}

//takes an array of ints, converts them to strings of length 16
//then returns a 2d array of ints
const decompress_tile = tile => {
    tile = tile.reduce((sum, row) => {
        if(row.toString().length < 16) return sum+Array(17-row.toString().length).join('0') + row.toString()
        return sum+row.toString()
    }, '').split('').map(val => parseInt(val))
    const tile_width = Math.sqrt(tile.length)
    let new_tile = []
    for(let row=0; row<tile_width; row++) new_tile.push(tile.splice(0,tile_width))
    return new_tile
}

// console.log(decompress_tile(test))

//returns a random element from an array
const get_random_element = tileset_array =>
    tileset_array[Math.floor(Math.random() * tileset_array.length)]

//mimics pythons zip function
//grabs the first element in each array and puts them into an array
//does the same with the second element, etc.
const zip = rows => 
    rows[0].map((_,c)=>rows.map(row=>row[c]))

//rotates and flips a 2d array
const rotate_2d_array = (array, direction) => {
    if(direction === 0) return array
    else if(direction === 90) return zip(array.reverse())
    else if(direction === 270) return zip(array).reverse()
    else if(direction === 180) return zip(rotate_2d_array(array, 90).reverse())
    else if(direction === 'vertical') return array.reverse()
    else if(direction === 'horizontal') return array.map(row => row.reverse())
}

const rotate_tile = (tile, direction) => {
    return compress_tile(rotate_2d_array(decompress_tile(tile), direction))
}

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

const get_shore_tile = (island, col, row) => {
    //get surroundings
    if((island[row-1] && island[row-1][col] === 0) || !island[row-1]) {
        if(!island[row][col-1]) return get_random_element(tileset.island.corner) //northwest
        else if(!island[row][col+1]) return rotate_tile(get_random_element(tileset.island.corner), 90) //northeast
        else return get_random_element(tileset.island.side) //north
    }
    else if((island[row+1] && island[row+1][col] === 0) || !island[row+1]) {
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
                let test = get_shore_tile(island, col, row)
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
                if(island[row-1] && island[row-1][col-1] === 1) total++
                if(island[row-1] && island[row-1][col] === 1) total++
                if(island[row-1] && island[row-1][col+1] === 1) total++
                if(island[row][col-1] === 1) total++
                if(island[row][col+1] === 1) total++
                if(island[row+1] && island[row+1][col-1] === 1) total++
                if(island[row+1] && island[row+1][col] === 1) total++
                if(island[row+1] && island[row+1][col+1] === 1) total++
                if(total >= 4) island[row][col] = 1
            }
            if(island[row][col] === 1) {
                //check all adjacent edges, if 0, change it to 2
                if(island[row-1][col-1] === 0) island[row-1][col-1] = 2
                if(island[row-1][col] === 0) island[row-1][col] = 2
                if(island[row-1][col+1] === 0) island[row-1][col+1] = 2
                if(island[row][col-1] === 0) island[row][col-1] = 2
                if(island[row][col+1] === 0) island[row][col+1] = 2
                if(island[row+1][col-1] === 0) island[row+1][col-1] = 2
                if(island[row+1][col] === 0) island[row+1][col] = 2
                if(island[row+1][col+1] === 0) island[row+1][col+1] = 2
            }
        }
    }
}

const generate_island = (config) => {
    //create 2d array
    let island = []
    for(let row=0;row<config.max_island_height; row++) island[row] = new Array(config.max_island_width).fill(0)

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
    for(let tileset_idx=0; tileset_idx<tileset.length; tileset_idx++) {
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

export default () => {
    const tileset = {
        island: {
            inland: [
                [614444473444444,3444444344344444,4444444444444444,4344444444434444],
                [734444463444443,2444444444434444,4444444443444444,4444444444443444],
                [724444473444434,2444444444443444,4444444444344444,4444444444444344],
                [624444463444444,3444343444444444,4444444444444444,4434434444444444]
            ],
            side: [
                [760000067767766,2327727732332323,4344323234343333,4343443344443344],
                [22232,6222342234344444,4434344443444444,4444444444444443],
                [26000000,4120000624112061,4434161434424442,4444444443444444],
                [77,2000733320033434,4333444444444444,4444444444444443],
                [67760000,7337233032443333,4344444344444443,4344443444444443],
            ],
            corner: [
                [0,67600006727,6722300072333,62323400672343],
                [0,7600000067,3300060673,62673400672343],
                [600,66676600677326,673223207322344,673244300673244],
                [0,6600000777,632300006244,7244300673244]
            ],
            mainland: [
                [4444444444444444,4444444343444344,4444444444444444,4334443444444344],
                [4444443444434344,4444444444344444,3444444444344444,4344443444344444],
                [4444434443444443,4444444444444444,4444344444444444,4444444433444444],
                [6444444444444444,4444444444443444,3444444444444444,4344444444444444],
                [4423335423334445,3344444434444444,3434444443434444,4444442322433333],
                [4444444454444444,5554443355555333,4444444323355544,3344455444444455],
                [3333333344444455,3344233344233344,4233344433333444,4444333344344434],
                [4444445544433444,5544334345544434,4455544444555554,4555554444433343]
            ]
        }
    }
    const config = universe_variables
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


    return {tileset: island_tileset, map: map, colors: ['#000','#cf9','#9c3','#993','#360','#030','#fc9','#c96']}
    // console.log(map)
}