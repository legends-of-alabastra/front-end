import React from 'react'
import gen_map from '../../../gen_map'
import draw_map from '../draw/map'
import draw_ship from '../draw/ship'
export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player_coordinates: {x: 0, y: 0},
            player_direction: 90,
            player_speed: 5,
            top: 0,
            left: 0,
            interval: null,
            map: []
        }
        
    }
    componentDidMount() {
        this.start_event_listeners()
        const {map, tileset, colors} = gen_map()
        draw_map(map, tileset, colors)
        this.setState({
            top: window.innerHeight / 2 - 5,
            left: window.innerWidth / 2 - 6,
            interval: setInterval(test => this.move_canvas(), 1000/30),
            map: map
        })
    }
    draw_ship() {
        draw_ship(this.state.player_direction)
    }
    move_canvas = (e) => {
        this.setState(prev => {
            if(e) {
                switch(e.key.toLowerCase()) {
                    case 's':
                    case 'arrowdown':
                        prev.player_speed === 0 ? prev.player_speed = .3 : prev.player_speed = 0
                        break
                    case 'a':
                    case 'arrowleft':
                        prev.player_direction -= 45
                        break
                    case 'd':
                    case 'arrowright':
                        prev.player_direction += 45
                        break
                    default: break
                }
                if(prev.player_direction >= 360) prev.player_direction = 0
                if(prev.player_direction < 0) prev.player_direction = 315
            }
            const map = this.state.map
            const row = Math.round(prev.player_coordinates.y/8)
            const col = Math.round(prev.player_coordinates.x/8)
            console.log('r', row, 'c', col)
            switch(prev.player_direction) {
                case 0:
                    if(map[row-1] && !map[row-1][col]) prev.player_coordinates.y-=prev.player_speed
                    break
                case 45:
                    if(map[row-1] && !map[row-1][col]) prev.player_coordinates.y-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    if(map[row][col+1] !== undefined && !map[row][col+1]) prev.player_coordinates.x+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    break
                case 90:
                    if(map[row][col+1] !== undefined && !map[row][col+1]) prev.player_coordinates.x+=prev.player_speed
                    break
                case 135:
                    if(map[row+1] && !map[row+1][col]) prev.player_coordinates.y+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    if(map[row][col+1] !== undefined && !map[row][col+1]) prev.player_coordinates.x+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    break
                case 180:
                    if(map[row+1] && !map[row+1][col]) prev.player_coordinates.y+=prev.player_speed
                    break
                case 225:
                    if(map[row+1] && !map[row+1][col]) prev.player_coordinates.y+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    if(map[row][col-1] !== undefined && !map[row][col-1]) prev.player_coordinates.x-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    break
                case 270:
                    if(map[row][col-1] !== undefined && !map[row][col-1])
                    prev.player_coordinates.x-=prev.player_speed
                    break
                case 315:
                    if(map[row-1] && !map[row-1][col]) prev.player_coordinates.y-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    if(map[row][col-1] !== undefined && !map[row][col-1]) prev.player_coordinates.x-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    break
                default: break
            }
            if(prev.player_coordinates.x < -window.innerWidth/2) prev.player_coordinates.x = -window.innerWidth/2
            if(prev.player_coordinates.y < -window.innerHeight/2) prev.player_coordinates.y = -window.innerHeight/2

            const canvas_coordinate_x = window.innerWidth / 2 - prev.player_coordinates.x
            const canvas_coordinate_y = window.innerHeight / 2 - prev.player_coordinates.y

            document.querySelector('#map').style.transform = `translate(${canvas_coordinate_x}px, ${canvas_coordinate_y}px)`
            this.draw_ship(90)
            console.log(prev.player_direction, '--', prev.player_coordinates)
            return(prev.player_coordinates)
        })
    }
    start_event_listeners = () => {
        window.addEventListener('keyup', e => this.move_canvas(e))
        window.addEventListener('resize', () => console.log('resize'))
    }
    stop_event_listerners = () => {
        window.removeEventListener('keyup', e => this.move_canvas(e))
        window.addEventListener('resize', () => console.log('resize'))
    }
    get_window_dimensions() {
        return {window_width: window.innerWidth, window_height: window.innerHeight}
    }
    render() {
        const ship = {position: 'absolute', top: this.state.top, left: this.state.left, zIndex: 1000, transform: 'rotateZ(90deg)'}
        return(
            <>
                <canvas id='ship' height='11' width='13' style={ship}></canvas>
                <canvas id='map'></canvas>
            </>
        )
    }
}