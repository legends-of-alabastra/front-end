from random import randrange as rand
from tileset import tileset
from config import config
from generate_island import generate_island

def add_to_tileset(tileset, tile):
    for tile_index in range(len(tileset)):
        if tile == tileset[tile_index]: return tile_index
    tileset.append(tile)
    return len(tileset)

def add_to_map(map, island, island_tileset):
    map_height =  len(map)
    map_width = len(map[0])
    island_height = len(island)
    island_width = len(island[0])
    max_tries = 1
    island_size = 0

    for _ in range(max_tries):
        start_x = rand(map_width-island_width)
        start_y = rand(map_height-island_height)
        can_add = True
        for row in range(start_y, start_y+island_height, 1):
            for col in range(start_x, start_x+island_width, 1):
                if island[row-start_y][col-start_x] is not 0: island_size += 1
                if map[row][col] is not 0 and island[row-start_y][col-start_x] is not 0:
                    can_add = False
                    break
            if not can_add: break
        if can_add: break
    
    if can_add:
        for row in range(start_y, start_y+island_height, 1):
            for col in range(start_x, start_x+island_width, 1):
                if island[row-start_y][col-start_x] is not 0:
                    map[row][col] = add_to_tileset(island_tileset, island[row-start_y][col-start_x])
    
    return island_size


def generate_map(tileset, config):
    island_tileset = []
    map = [[0 for x in range(config['map']['width'])] for y in range(config['map']['width'])]
    map_coverage = 0
    while map_coverage < config['map']['width']*config['map']['height']*(config['map']['coverage']/100):
        island = generate_island(tileset['island'], config['island'])
        map_coverage += add_to_map(map, island, island_tileset)
    return {'tileset': island_tileset, 'map': map, 'colors': tileset['island']['colors']}


print(generate_map(tileset, config))