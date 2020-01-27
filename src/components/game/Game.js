import React from 'react'
import axios from 'axios'
import Pusher from "pusher-js"

import gen_map from '../gen_map'

import Map from './components/map'
import Ship from './components/ship'
import BottomBar from '../BottomBar'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            interval: null,
            ship_speed: 5,

            map: [],
            map_tileset: [],
            map_colors: [],
            
            item_array: [],
            gold: 0,
            gem: 0,

            player_coordinates: {x: 0, y: 0},
            player_direction: 90,
            player_speed: 5,

            players: []
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', e => this.player_action(e))
        window.removeEventListener('keydown', e => this.update_player_direction(e))
    }

    componentDidMount() {
        window.addEventListener('keyup', e => this.player_action(e))
        window.addEventListener('keydown', e => this.update_player_direction(e))

        const {map, tileset, colors} = gen_map() //REPLACE THIS WITH API

        this.setState({
            map: map,
            map_tileset: tileset,
            map_colors: colors,
            interval: setInterval(() => this.update_player_position(), 1000/30),
            // player_coordinates: this.get_random_water_tile(map)
        })

        //grabs items pushes to clients
        let pusher = new Pusher("c94e812bb791c21a37e8", {
            cluster: "us2",
            forceTLS: true
          })
      
          let channel = pusher.subscribe("my-channel")
          channel.bind("itemArray", (data) => {
            console.log(data.description)
            this.setState({ item_array: data.description })
          })

        axios
            .get('https://alabastraapp.herokuapp.com/api/getItems/')
            .then(res => {
                // console.log(res.data)
                this.setState({ item_array: res.data })
            })
            .catch(err => console.log(err))
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

    // startGame = () => {
    //     const intervalId = setInterval(this.move_canvas, 1000/30)
    //     this.setState({ interval: intervalId })
    // }

    getItem = (row, col) => {
        const user_id = localStorage.getItem('user_id')
        const username = localStorage.getItem('username')

        const put = {
            "id": user_id,
            "username": username,
        } 

        axios
            .post('https://alabastraapp.herokuapp.com/api/items/', {"x": row, "y": col})
            .then(res => {
                console.log(res.data)
                axios
                    .put('https://alabastraapp.herokuapp.com/additems/', {
                        ...put, [res.data.name]: res.data.value, "item_key": res.data.item_key
                    })
                    .then(res => {
                        console.log(res.data)
                        this.setState({ gold: res.data.gold, gem: res.data.gem })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
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
            case ']':
                this.setState(prev => {
                    prev.player_speed = 20
                    return({player_speed: prev.player_speed})
                })
                break
            default: break
        }
    }
    update_player_direction = e => {
        const row = Math.round(this.state.player_coordinates.y/8);
        const col = Math.round(this.state.player_coordinates.x/8);
        
        const is_item = this.state.item_array.find(item => item.x > 0 && item.x === row && item.y > 0 && item.y === col)
        if(is_item) {
            console.log('item found')
            this.getItem(is_item.x, is_item.y)
        }

        this.setState(prev => {
            if(e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'arrowleft') prev.player_direction += 7
            else if(e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'arrowright') prev.player_direction -= 7
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
            return(prev.player_coordinates)
        })
    }
    // move_canvas = (e) => {
    //     //checks if item exists
    //     const is_item = this.state.item_array.find(item => item.x > 0 && item.x === row && item.y > 0 && item.y === col)
    //     if(is_item) {
    //         this.getItem(is_item.x, is_item.y)
    //     }
    // }
    render() { 
        return(
            <div className='game' style={{overflow: 'hidden',
                height: '100vh',
                width: '100vw',
                margin: '0',
                zIndex: '-1',
                backgroundColor: '#000'}}>
                <Map
                    map={this.state.map}
                    tileset={this.state.map_tileset}
                    colors={this.state.map_colors}
                    player_coordinates={this.state.player_coordinates}/>
                <Ship
                    player_direction={this.state.player_direction}
                    player_coordinates={this.state.player_coordinates}/>
                <BottomBar 
                    gold = { this.state.gold }
                    gem = { this.state.gem }
                    startGame = { this.startGame }
                />
            </div>
        )
    }
}