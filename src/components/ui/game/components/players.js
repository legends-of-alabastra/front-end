import React from 'react'
import draw_ship from '../draw/ship'

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
    }
    componentDidMount() {}
    render() {
        return (
            <canvas id='players'></canvas>
        )
    }
}