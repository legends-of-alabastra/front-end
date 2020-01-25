import React from 'react'
//style
import Style from './style'
//components
import Map from './map'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {

    }
    render() {
        return (
            <Style className='game'>
                <Map></Map>
            </Style>
        )
    }
}