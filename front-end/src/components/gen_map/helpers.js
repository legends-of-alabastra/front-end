//takes a tile (2d array) and compresses it down to an array of 16 digit integers
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
    else if(direction == 90) return zip(array.reverse())
    else if(direction == 270) return zip(array).reverse()
    else if(direction == 180) return zip(rotate_2d_array(array, 90).reverse())
    else if(direction === 'vertical') return array.reverse()
    else if(direction === 'horizontal') return array.map(row => row.reverse())
}

const rotate_tile = (tile, direction) => {
    return compress_tile(rotate_2d_array(decompress_tile(tile), direction))
}

export const helpers = {
    rotate_2d_array,
    zip,
    rotate_tile,
    get_random_element,
    decompress_tile,
    compress_tile
}