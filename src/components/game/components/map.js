import React from 'react'
import draw_map from '../draw/map'

const move_canvas = player_coordinates => {
    const canvas_coordinate_x = window.innerWidth / 2 - player_coordinates.x
    const canvas_coordinate_y = window.innerHeight / 2 - player_coordinates.y
    if(document.querySelector('#map'))
        document.querySelector('#map').style.transform = `translate(${canvas_coordinate_x}px, ${canvas_coordinate_y}px)`
}

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player_coordinates: {x: 0, y: 0},
            map: [],
            colors: [],
            tileset: [],
            interval: null,
        }
    }
    static getDerivedStateFromProps = (next, prev) => {
        if(prev.map !== next.map) draw_map(next.map, next.tileset, next.colors)
        move_canvas(next.player_coordinates)
        return next
    }
    move_canvas() {
        this.setState(prev => {
            const canvas_coordinate_x = window.innerWidth / 2 - prev.player_coordinates.x
            const canvas_coordinate_y = window.innerHeight / 2 - prev.player_coordinates.y
            document.querySelector('#map').style.transform = `translate(${canvas_coordinate_x}px, ${canvas_coordinate_y}px)`
            return(prev.player_coordinates)
        })
    }
    render() {
        return(
            <canvas id='map' style={{position: 'absolute', left: 0, top: 0, backgroundColor: 'red'}}></canvas>
        )
    }
}