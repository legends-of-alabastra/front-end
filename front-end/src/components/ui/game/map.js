import React from 'react'
import gen_map from '../../gen_map'

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            map: [],
            tileset: [],
            colors: [],
            player_coordinates: {x: 2000, y: 0}
        }
        window.addEventListener('resize', console.log('resize'))
    }
    componentDidMount() {
        //get window dimensions
        window.addEventListener("resize", () => this.draw_map())
        window.addEventListener('keyup', () => this.move_player_east())
        //get map
        const {map, tileset, colors} = gen_map()
        this.setState({
            map: map,
            tileset: tileset,
            colors: colors
        })
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.draw_map())
    }
    move_player_east() {
        this.setState(prevState => {
            const new_x = prevState.player_coordinates.x + 8
            return {
                player_coordinates: {x: new_x, y: 0}
            }
        })
    }
    get_window_dimensions() {
        return {window_width: window.innerWidth, window_height: window.innerHeight}
    }
    decompress_tile(tile) {
        tile = tile.reduce((sum, row) => {
            if(row.toString().length < 16) return sum+Array(17-row.toString().length).join('0') + row.toString()
            return sum+row.toString()
        }, '').split('').map(val => parseInt(val))
        const tile_width = Math.sqrt(tile.length)
        let new_tile = []
        for(let row=0; row<tile_width; row++) new_tile.push(tile.splice(0,tile_width))
        return new_tile
    }
    draw_tile(ctx, coordinates, colors, tile) {
        tile.forEach((color_row, row) => {
            const offset_x = row * 1 + coordinates.y
            color_row.forEach((color, col) => {
                const offset_y = col * 1 + coordinates.x
                if(color !== 0) {
                    ctx.fillStyle = colors[color]
                    ctx.fillRect(offset_y, offset_x, 1, 1)
                }
            })
        })
    }
    draw_map() {
        if(!this.state.map.length) return null
        const {window_width, window_height} = this.get_window_dimensions()
        let {x, y} = this.state.player_coordinates
        const canvas = document.getElementById('map')
        const ctx = canvas.getContext('2d')
        const screen_width_in_tiles = Math.ceil(window_width / 8)
        const screen_height_in_tiles = Math.ceil(window_height / 8)
        ctx.canvas.width = window_width
        ctx.canvas.height = window_height
        //draw water (it's just blue)
        ctx.fillStyle = '#00f'
        ctx.fillRect(0,0,this.state.map[0].length*8, this.state.map.length*8)

        //player tile location in map
        const start_col_tile = Math.max(Math.ceil((2*x-window_width)/16),0)
        const start_row_tile = Math.max(Math.ceil((2*y-window_height)/16),0)

        for(let row=start_row_tile; row<=screen_height_in_tiles+start_row_tile; row++) {
            x = 0
            for(let col=start_col_tile; col<=screen_width_in_tiles+start_col_tile; col++) {
                if(this.state.map[row][col] !== 0) {
                    const tile = this.decompress_tile(this.state.tileset[this.state.map[row][col]])
                    this.draw_tile(ctx, {x:x,y:y}, this.state.colors, tile)
                }
                x += 8
            }
            y += 8
        }
    }
    render() {
        this.draw_map(this.state.map, this.state.tileset, this.state.colors)
        return(<canvas id='map'></canvas>)
    }
}