const universe_variables = {
  min_tiles_from_edge: 3,
  map_width: 1200,
  map_height: 800,
  chance_of_island_expansion: 55,
  map_coverage: 20,
  max_island_width: 500,
  max_island_height: 500,
  min_island_width: 20,
  min_island_height: 20,
}

const compress_tile = tile => {
  while(tile.length >= 16) tile.push(tile.splice(0,16).reduce((sum, el) => sum += (el + '')))
  return tile.map(el => parseInt(el, 10))
}

const get_rand_tile_from_tileset = tileset_array =>
  compress_tile(tileset_array[Math.floor(Math.random() * tileset_array.length)])

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

const island_get_shore_tile = (island, col, row) => {
  //get surroundings
  if(island[row-1] && island[row-1][col] === 0 || !island[row-1]) {
      if(!island[row][col-1]) return tileset.island.edge.northwest[0]
      else if(!island[row][col+1]) island[row][col] = 'northeast'
      else island[row][col] = 'north'
  }
  else if(island[row+1] && island[row+1][col] === 0 || !island[row+1]) {
      if(!island[row][col-1]) island[row][col] = 'southwest'
      else if(!island[row][col+1]) island[row][col] = 'southeast'
      else island[row][col] = 'south'
  }
  else if(!island[row][col-1]) island[row][col] = 'west'
  else if(!island[row][col+1]) island[row][col] = 'east'
  else island[row][col] = 'inland'
  return tileset.island.edge[island[row][col]][0]
}

const island_tiles = island => {
  for(let row=0; row<island.length; row++) {
      for(let col=0; col<island[0].length; col++) {
          const tile_type = island[row][col]
          if(tile_type === 1) island[row][col] = tileset.island.mainland[0]
          if(tile_type === 2) island[row][col] = island_get_shore_tile(island, col, row)
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

// generate_map(tileset, universe_variables)