import React from 'react'
//style
import Style from './style'
//components
import Map from './components/map'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        console.log('made it here')
    }
    render() {
        return (
            <Style className='game'>
                <Map></Map>
            </Style>
        )
    }
}