import React from 'react'
//style
import Style from './style'
//components

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Style className='game'>
                <span>yerp</span>
            </Style>
        )
    }
}