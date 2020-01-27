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
            ship_speed: 20,

            map: [],
            map_tileset: [],
            map_colors: [],

            player_coordinates: {x: 0, y: 0},
            player_tile: {x: 0, y: 0},
            player_direction: 90,
            player_speed: 0,

            players: []
        }
    }
    componentDidMount() {
        window.addEventListener('keyup', e => this.player_action(e))
        window.addEventListener('keydown', e => this.update_player_direction(e))
        window.addEventListener('resize', () => console.log('resize'))
        const {map, tileset, colors} = gen_map()

        this.setState({
            map: map,
            map_tileset: tileset,
            map_colors: colors,
            interval: setInterval(() => this.update_player_position(), 1000/30),
            player_coordinates: this.get_random_water_tile(map)
        })
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', e => this.player_action(e))
        window.removeEventListener('keydown', e => this.update_player_direction(e))
        window.removeEventListener('resize', () => console.log('resize'))
    }
    get_random_water_tile = map => {
        let coordinates = {x: 0, y: 0}
        while(true) {
            coordinates.y = Math.floor(Math.random()*map.length*8)
            coordinates.x = Math.floor(Math.random()*map[0].length*8)
            if(map[Math.round(coordinates.y/8)][Math.round(coordinates.x/8)] === 0) break
        }
        return coordinates
    }
    player_action = e => {
        switch(e.key.toLowerCase()) {
            case 's':
            case 'arrowdown':
                this.setState(prev => {
                    prev.player_speed === 0 ? prev.player_speed = prev.ship_speed : prev.player_speed = 0
                    return({player_speed: prev.player_speed})
                })
                break
            default: break
        }
    }
    update_player_direction = e => {
        this.setState(prev => {
            if(e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'arrowleft') prev.player_direction += 5
            else if(e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'arrowright') prev.player_direction -= 5
            if(prev.player_direction < 0) prev.player_direction = 359
            if(prev.player_direction > 360) prev.player_direction = 1
            return(prev.player_direction)
        })
    }
    update_player_position = e => {
        this.setState(prev => {
            const x = prev.player_speed*Math.sin(Math.PI * prev.player_direction / 180)
            const y = prev.player_speed*Math.cos(Math.PI * prev.player_direction / 180)
            let col = Math.round((6+x+prev.player_coordinates.x)/8)
            let row = Math.round((y+prev.player_coordinates.y)/8)
            if(prev.map[row] && prev.map[row][col] === 0)
                prev.player_coordinates.y = Math.round(10*(prev.player_coordinates.y + y))/10
            if(prev.map[row] && prev.map[row][col] !== undefined && prev.map[row][col] === 0)
                prev.player_coordinates.x = Math.round(10*(prev.player_coordinates.x + x))/10
            // if(prev.player_coordinates.y <= 0) prev.player_coordinates.y = prev.map.length*8
            // if(prev.player_coordinates.y >= prev.map.length*8) prev.player_coordinates.y = 0
            // if(prev.player_coordinates.x <= 0) prev.player_coordinates.x = prev.map[0].length*8
            // if(prev.player_coordinates.x >= prev.map[0].length*8) prev.player_coordinates.x = 0
                
            // if(prev.player_coordinates.y <= 10) prev.player_coordinates.y = prev.map.length*8
            // if(prev.player_coordinates.y >= prev.map.length*8-10) prev.player_coordinates.y = 0
            // if(prev.player_coordinates.x <= 10) prev.player_coordinates.x = prev.map[0].length*8
            // if(prev.player_coordinates.x >= prev.map[0].length*8-10) prev.player_coordinates.x = 0
            
            
            return(prev.player_coordinates)
        })
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