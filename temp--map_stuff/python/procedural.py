from tileset import tileset
from config import config
from generate_island import generate_island

def generate_map(tileset, config):
    island_tileset = []
    map = [[0 for x in range(config['map']['width'])] for y in range(config['map']['width'])]
    map_coverage = 0
    generate_island(tileset['island'], config['island'])
    #add island to map
    #create tileset
    #return map, tileset, colors


generate_map(tileset, config)