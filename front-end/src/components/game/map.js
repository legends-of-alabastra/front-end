import React from 'react'
import gen_map from '../../gen_map'
import draw from './helpers'

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player_coordinates: {x: 100, y: 100},
            player_direction: 90,
            player_speed: 0.3,
        }
        window.addEventListener('resize', console.log('resize'))
    }
    componentDidMount() {
        this.start_event_listeners()
        const {map, tileset, colors} = gen_map()
        draw(map, tileset, colors)
        setInterval(test => this.move_canvas(), 1000/30)
    }
    move_canvas = (e) => {
        this.setState(prev => {
            if(e) {
                switch(e.key.toLowerCase()) {
                    case 's':
                    case 'arrowdown':
                        prev.player_speed == 0 ? prev.player_speed = .3 : prev.player_speed = 0
                        break
                    case 'a':
                    case 'arrowleft':
                        prev.player_direction -= 90
                        break
                    case 'd':
                    case 'arrowright':
                        prev.player_direction += 90
                        break
                    default: break
                }
                if(prev.player_direction >= 360) prev.player_direction = 0
                if(prev.player_direction < 0) prev.player_direction = 270
            }
            switch(prev.player_direction) {
                case 0: prev.player_coordinates.y+=prev.player_speed; break
                case 90: prev.player_coordinates.x-=prev.player_speed; break
                case 180: prev.player_coordinates.y-=prev.player_speed; break
                case 270: prev.player_coordinates.x+=prev.player_speed; break
                default: break
            }
            if(prev.player_coordinates.x < -window.innerWidth/2) prev.player_coordinates.x = -window.innerWidth/2
            if(prev.player_coordinates.y < -window.innerHeight/2) prev.player_coordinates.y = -window.innerHeight/2
            document.querySelector('#map').style.transform = `translate(${prev.player_coordinates.x}px, ${prev.player_coordinates.y - window.innerHeight}px) rotateX(60deg) rotateZ(45deg)`

            return(prev.player_coordinates)
        })
    }
    start_event_listeners = () => {
        window.addEventListener('keyup', e => this.move_canvas(e))
    }
    stop_event_listeners = () => {
        window.removeEventListener('keyup', e => this.move_canvas(e))
    }
    get_window_dimensions() {
        return {window_width: window.innerWidth, window_height: window.innerHeight}
    }
    render() {
        return(<canvas id='map'></canvas>)
    }
}