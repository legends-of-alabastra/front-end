import React from 'react'

import draw_ship from '../draw/ship'

export default class Ship extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player_direction: 0,
            player_coordinates: {x: 0, y: 0},
        }
    }
    componentDidMount = () => {
        draw_ship(this.state.player_coordinates, this.state.player_direction, this.state.player_coordinates)
    }
    static getDerivedStateFromProps = (next, prev) => {
        if(prev.player_direction !== next.player_direction)
            draw_ship(next.player_coordinates, next.player_direction, next.player_coordinates)
        return next
    }
    render() {
        return (
            <canvas id='ship' style={{position: 'absolute', left: 0, top: 0, zIndex: 1000}}></canvas>
        )
    }
}