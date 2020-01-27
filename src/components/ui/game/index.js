import React from 'react'
//style
import Style from './style'
//components
import Map from './components/map'
import Ship from './components/ship'
//helpers
import gen_map from '../../gen_map'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            interval: null,

            map: [],
            map_tileset: [],
            map_colors: [],

            player_coordinates: {x: 0, y: 0},
            player_tile: {x: 0, y: 0},
            player_direction: 90,
            player_speed: 1,

            players: []
        }
    }
    componentDidMount() {
        window.addEventListener('keyup', e => console.log('up'))
        window.addEventListener('keydown', e => this.update_player_direction(e))
        window.addEventListener('resize', () => console.log('resize'))
        const {map, tileset, colors} = gen_map()
        this.setState({
            map: map,
            map_tileset: tileset,
            map_colors: colors,
            interval: setInterval(() => this.update_player_position(), 1000/30)
        })
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', e => console.log('up'))
        window.removeEventListener('keydown', e => this.update_player_direction(e))
        window.removeEventListener('resize', () => console.log('resize'))
    }
    update_player_direction = e => {
        this.setState(prev => {
            if(e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'arrowleft') prev.player_direction += 2
            else if(e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'arrowright') prev.player_direction -= 2
            if(prev.player_direction < 0) {
                prev.player_direction = 359
            }
            if(prev.player_direction > 360) prev.player_direction = 1
            return(prev.player_direction)
        })
    }
    update_player_position = e => {
        this.setState(prev => {
            const x = prev.player_speed*Math.sin(Math.PI * prev.player_direction / 180)
            const y = prev.player_speed*Math.cos(Math.PI * prev.player_direction / 180)
            const col = Math.round((x+prev.player_coordinates.x)/8)
            const row = Math.round((y+prev.player_coordinates.y)/8)
            if(prev.map[row] && prev.map[row] !== 0)
                prev.player_coordinates.y = Math.round(10*(prev.player_coordinates.y + y))/10
            if(prev.map[row] && prev.map[row][col] !== undefined && prev.map[row][col] === 0)
                prev.player_coordinates.x = Math.round(10*(prev.player_coordinates.x + x))/10
            return(prev.player_coordinates)
        })
    }
    move_player = (e) => {

    }
    render() {
        return (
            <Style className='game'>
                <Map
                    map={this.state.map}
                    tileset={this.state.map_tileset}
                    colors={this.state.map_colors}
                    player_coordinates={this.state.player_coordinates}/>
                <Ship
                    player_direction={this.state.player_direction}
                    player_coordinates={this.state.player_coordinates}/>
            </Style>
        )
    }
}