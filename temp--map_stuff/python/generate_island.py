import math as m
import functools as ft
from random import randrange as rand
from helpers import get_random_element as get_tile, rotate_tile as rotate

def grow(island, coordinates, chance):
    #if at edge of map
    if coordinates['y'] == 0 or coordinates['y'] == len(island)-1 or coordinates['x'] == 0 or coordinates['x'] == len(island[0])-1:
       island[coordinates['y']][coordinates['x']] = 2
    else:
        island[coordinates['y']][coordinates['x']] = 1
        #north
        if island[coordinates['y']-1][coordinates['x']] == 0:
            if rand(100) < chance['north'] or coordinates['y']-1 == 0: island[coordinates['y']-1][coordinates['x']] = 2
            else: grow(island, {'x': coordinates['x'], 'y': coordinates['y']-1}, chance)
        #east
        if island[coordinates['y']][coordinates['x']+1] == 0:
            if rand(100) < chance['east'] or coordinates['x']+1 == len(island[0]): island[coordinates['y']][coordinates['x']+1] = 2
            else: grow(island, {'x': coordinates['x']+1, 'y': coordinates['y']}, chance)
        #south
        if island[coordinates['y']+1][coordinates['x']] == 0:
            if rand(100) < chance['north'] or coordinates['y']+1 == 0: island[coordinates['y']+1][coordinates['x']] = 2
            else: grow(island, {'x': coordinates['x'], 'y': coordinates['y']+1}, chance)
        #west
        if island[coordinates['y']][coordinates['x']-1] == 0:
            if rand(100) < chance['east'] or coordinates['x']-1 == len(island[0]): island[coordinates['y']][coordinates['x']-1] = 2
            else: grow(island, {'x': coordinates['x']-1, 'y': coordinates['y']}, chance)

def trim(island):
    island = list(filter(lambda x: ft.reduce(lambda sum,el : sum+el, x) is not 0, island))
    min = len(island[0])
    max = 0
    for row in range(len(island)):
        for col in range(len(island[0])):
            if island[row][col] is not 0:
                if col < min:
                    min = col
                    break
    for row in range(len(island)):
        for col in range(len(island[0])-1,-1,-1):
            if island[row][col] is not 0:
                if col > max:
                    max = col
                    break
    return list(map(lambda row: row[min:max+1], island))

def cleanup(island):
    for row in range(1, len(island)-1):
        for col in range(1, len(island[0])-1):
            if island[row][col] == 2:
                land = 0
                if island[row-1][col-1] == 1: land += 1
                if island[row-1][col] == 1: land += 1
                if island[row-1][col+1] == 1: land += 1
                if island[row][col-1] == 1: land += 1
                if island[row][col] == 1: land += 1
                if island[row][col+1] == 1: land += 1
                if island[row+1][col-1] == 1: land += 1
                if island[row+1][col] == 1: land += 1
                if island[row+1][col+1] == 1: land += 1
                if land >= 3: island[row][col] = 1
            if island[row][col] == 1:
                if island[row-1][col-1] == 0: island[row-1][col-1] = 2
                if island[row-1][col] == 0: island[row-1][col] = 2
                if island[row-1][col+1] == 0: island[row-1][col+1] = 2
                if island[row][col-1] == 0: island[row][col-1] = 2
                if island[row][col] == 0: island[row][col] = 2
                if island[row][col+1] == 0: island[row][col+1] = 2
                if island[row+1][col-1] == 0: island[row+1][col-1] = 2
                if island[row+1][col] == 0: island[row+1][col] = 2
                if island[row+1][col+1] == 0: island[row+1][col+1] = 2

def shore_tile(island, tileset, row, col):
    island_width = len(island[0])-1
    island_height = len(island)-1
    if row is 0 or row is not 0 and island[row-1][col] is 0:
        if col is 0 or col is not 0 and island[row][col-1] is 0: return get_tile(tileset['corner'])
        elif col is island_width or col is not island_width and island[row][col+1] is 0: return rotate(get_tile(tileset['corner']),90)
        else: return get_tile(tileset['side'])
    if row is island_height or row is not island_height and island[row+1][col] is 0:
        if col is 0 or col is not 0 and island[row][col-1] is 0: return rotate(get_tile(tileset['corner']),270)
        elif col is island_width or col is not island_width and island[row][col+1] is 0: return rotate(get_tile(tileset['corner']),180)
        else: return rotate(get_tile(tileset['side']),180)
    if col is 0 or col is not 0 and island[row][col-1] is 0: return rotate(get_tile(tileset['side']), 270)
    if col is island_width or col is not island_width and island[row][col+1] is 0: return rotate(get_tile(tileset['side']),90)
    else: return rotate(get_tile(tileset['inland']), rand(4)*90)

def tiles(island, tileset):
    for row in range(len(island)):
        for col in range(len(island[0])):
            if island[row][col] == 1: island[row][col] = rotate(get_tile(tileset['mainland']), rand(4)*90)
            elif island[row][col] == 2: island[row][col] = shore_tile(island, tileset, row, col)

def generate_island(tileset, config):
    while True:
        island = [[0 for x in range(config['max_width'])] for y in range(config['max_height'])]
        coordinates = {'x': config['max_width'] // 2, 'y': config['max_height'] // 2}
        grow(island, coordinates, config['chance_of_expansion'])
        island = trim(island)
        if len(island) > config['min_height'] and len(island[0]) > config['min_width']: break
    cleanup(island)
    tiles(island, tileset)
    return island