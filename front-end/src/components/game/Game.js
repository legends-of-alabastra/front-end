import React from 'react';
import axios from 'axios';

import Pusher from "pusher-js";

import gen_map from '../gen_map';
import draw_map from './draw/map';
import draw_ship from './draw/ship.js';

import BottomBar from '../BottomBar';

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
            map: [],
            item_array: [],
            gold: 0,
            gem: 0
        }
    }

    componentDidMount() {
        this.start_event_listeners()
        const {map, tileset, colors} = gen_map()
        draw_map(map, tileset, colors)

        let randomX = Math.floor(Math.random() * (5000 - 500 + 1))
        let randomY = Math.floor(Math.random() * (3000 - 300 + 1))

        if(map[Math.floor(randomY/8)] !== undefined && map[Math.floor(randomY/8)][Math.floor(randomX/8)] !== undefined) {
            while(map[Math.floor(randomY/8)] !== undefined && map[Math.floor(randomY/8)][Math.floor(randomX/8)] !== undefined && map[Math.floor(randomY/8)][Math.floor(randomX/8)] > 0) {
                randomX = Math.floor(Math.random() * (5000 - 500 + 1))
                randomY = Math.floor(Math.random() * (5000 - 500 + 1))
            }
        }

        this.setState({
            top: window.innerHeight / 2 - 5,
            left: window.innerWidth / 2 - 6,
            map: map,
            player_coordinates: {
                x: randomX,
                y: randomY
            }
        })

        let pusher = new Pusher("c94e812bb791c21a37e8", {
            cluster: "us2",
            forceTLS: true
          });
      
          let channel = pusher.subscribe("my-channel");
          channel.bind("itemArray", (data) => {
            console.log(data.description)
            this.setState({ item_array: data.description })
          });

        axios
            .get('https://alabastraapp.herokuapp.com/getitems/')
            .then(res => {
                console.log(res.data)
                this.setState({ item_array: res.data })
            })
            .catch(err => console.log(err))
    }

    draw_ship() {
        draw_ship(this.state.player_direction)
    }

    startGame = () => {
        const intervalId = setInterval(this.move_canvas, 1000/30)
        this.setState({ interval: intervalId })
    }

    getItem = (row, col) => {
        const user_id = localStorage.getItem('user_id');
        const username = localStorage.getItem('username');

        const put = {
            "id": user_id,
            "username": username,
        } 

        axios
            .post('https://alabastraapp.herokuapp.com/api/items/', {"x": row, "y": col})
            .then(res => {
                axios
                    .put('https://alabastraapp.herokuapp.com/additems/', {
                        ...put, [res.data.name]: res.data.value, "item_key": res.data.item_key
                    })
                    .then(res => {
                        this.setState({ gold: res.data.gold, gem: res.data.gem })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    
    move_canvas = (e) => {
        const map = this.state.map
        const row = Math.round(this.state.player_coordinates.y/8)
        const col = Math.round(this.state.player_coordinates.x/8)

        const is_item = this.state.item_array.find(item => item.x > 0 && item.x === row && item.y > 0 && item.y === col)

        if(is_item) {
            this.getItem(is_item.x, is_item.y)
        }

        this.setState(prev => {
            if(e) {
                switch(e.key.toLowerCase()) {
                    case 's':
                    case 'arrowdown':
                        prev.player_speed === 0 ? prev.player_speed = 5 : prev.player_speed = 0
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

            switch(prev.player_direction) {
                case 0:
                    if(map[row-1] && !map[row-1][col]) {
                        prev.player_coordinates.y-=prev.player_speed
                    }

                    break;
                case 45:
                    if(map[row-1] && !map[row-1][col]) {
                        prev.player_coordinates.y-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    if(map[row][col+1] !== undefined && !map[row][col+1]) {
                        prev.player_coordinates.x+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    break
                case 90:
                    if(map[row][col+1] !== undefined && !map[row][col+1]) {
                        prev.player_coordinates.x+=prev.player_speed
                    }

                    break;
                case 135:
                    if(map[row+1] && !map[row+1][col]) {
                        prev.player_coordinates.y+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    if(map[row][col+1] !== undefined && !map[row][col+1]) {
                        prev.player_coordinates.x+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    break;
                case 180:
                    if(map[row+1] && !map[row+1][col]) {
                        prev.player_coordinates.y+=prev.player_speed
                    }
                    break;
                case 225:
                    if(map[row+1] && !map[row+1][col]) {
                        prev.player_coordinates.y+=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    if(map[row][col-1] !== undefined && !map[row][col-1]) {
                        prev.player_coordinates.x-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    break;
                case 270:
                    if(map[row][col-1] !== undefined && !map[row][col-1]) {
                        prev.player_coordinates.x-=prev.player_speed
                    }

                    break;
                case 315:
                    if(map[row-1] && !map[row-1][col]) {
                        prev.player_coordinates.y-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    if(map[row][col-1] !== undefined && !map[row][col-1]) {
                        prev.player_coordinates.x-=Math.sqrt((prev.player_speed*prev.player_speed)/2)
                    }

                    break;
                default: break
            }

            if(prev.player_coordinates.x < -window.innerWidth/2) {
                prev.player_coordinates.x = -window.innerWidth/2
            }

            if(prev.player_coordinates.y < -window.innerHeight/2) {
                prev.player_coordinates.y = -window.innerHeight/2
            }

            const canvas_coordinate_x = window.innerWidth / 2 - prev.player_coordinates.x;

            const canvas_coordinate_y = window.innerHeight / 2 - prev.player_coordinates.y;

            document.querySelector('#map').style.transform = `translate(${canvas_coordinate_x}px, ${canvas_coordinate_y}px)`
            this.draw_ship(90)
            // console.log(parseInt(prev.player_direction))
            // console.log("x", parseInt(prev.player_coordinates.x))
            // console.log("y", parseInt(prev.player_coordinates.y))
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
                { this.state.interval === null ? <button onClick = { () => this.startGame() } style = {{ position: 'absolute', top: 100, left: 100 }}>start game</button> : null }
                <BottomBar 
                    gold = { this.state.gold }
                    gem = { this.state.gem }
                    startGame = { this.startGame }
                />
            </>
        )
    }
}