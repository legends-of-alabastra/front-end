import functools as ft
import random

def compress_tile(tile):
    compressed_tile = []
    for arr in range(0, len(tile), 2): compressed_tile.append(tile[arr]+tile[arr+1])
    return list(map(lambda x: int(ft.reduce(lambda sum,el : str(sum)+str(el), x)), compressed_tile))

def decompress_tile(tile):
    decompressed_tile = []
    for el in tile:
        if len(str(el)) < 16: el = ('0' * (16-len(str(el))))+str(el)
        else: el = str(el)
        decompressed_tile.append([int(c) for c in el[:8]])
        decompressed_tile.append([int(c) for c in el[8:]])
    return decompressed_tile

def get_random_element(array):
    return random.choice(array)

def rotate_2d_array(array, direction):
    if direction == 0: return array
    if direction == 90: return [list(el) for el in zip(*array[::-1])]
    if direction == 180: return [list(el) for el in zip(*rotate_2d_array(array,90)[::-1])]
    if direction == 270: return [list(el) for el in zip(*array)][::-1]

def rotate_tile(tile, direction):
    return compress_tile(rotate_2d_array(decompress_tile(tile), direction))