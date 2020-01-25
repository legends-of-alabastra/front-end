import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { tileset, universe_variables, generate_map, decompress_tile, draw_tile } from './draw';

export default class Map extends Component {
  state = {
    direction: '',
    scroll_interval: null,
    player_position: {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    },
    map: [],
    column: 0,
    row: 0
  }

  componentDidMount() {
    const map = generate_map(tileset, universe_variables)

    this.setState({
      scroll_interval: setInterval(this.interval, 1000),
      map
    })

    setTimeout( () => {
      const { x, y, width, height } = this.refs.player_position.getBoundingClientRect();
      this.setState({ 
        player_position: {
          x: Math.floor(x + (width / 2)),
          y: Math.floor(y + (height / 2)),
          w: Math.floor(width),
          h: Math.floor(height),
        },
        column: Math.floor((x + (width / 2)) / 8),
        row: Math.floor((y + (height / 2)) / 8),
        min_x: Math.floor(x / 8),
        min_y: Math.floor(y / 8)
      })
    }, 500)
  }

  interval = () => {
    const { direction, player_position, column, row, map } = this.state;
    const { x, y } = player_position;

    const hitbox = map.map[row][column];

    switch(direction) {
      case 'NW':
        if(hitbox > 0) {
          window.scrollBy(16, 16)
          this.setState({
            player_position: {
              ...player_position,
              x: x + 16,
              y: y + 16
            },
            column: column + 2,
            row: row + 2,
          })
        } else {
          window.scrollBy(-8, -8)
          this.setState({
            player_position: {
              ...player_position,
              x: x - 8,
              y: y - 8
            },
            column: column - 1,
            row: row - 1
          })
          break;
        }
      case 'N':
        if(hitbox > 0) {
          window.scrollBy(0, 16)
          this.setState({
            player_position: {
              ...player_position,
              y: y + 16
            },
            row: row + 2
          })
          break;
        } else {
          window.scrollBy(0, -8)
          this.setState({
            player_position: {
              ...player_position,
              y: y - 8
            },
            row: row - 1
          })
          break;
        }
      case 'NE':
        if(hitbox > 0) {
          window.scrollBy(-16, 16)
          this.setState({
            player_position: {
              ...player_position,
              x: x - 16,
              y: y + 16
            },
            column: column - 2,
            row: row + 2
          })
          break; 
        } else {
          window.scrollBy(8, -8)
          this.setState({
            player_position: {
              ...player_position,
              x: x + 8,
              y: y - 8
            },
            column: column + 1,
            row: row - 1
          })
          break; 
        }
      case 'W':
        if(hitbox > 0) {
          window.scrollBy(16, 0)
          this.setState({
            player_position: {
              ...player_position,
              x: x + 16,
            },
            column: column + 2
          })
          break;
        } else {
          window.scrollBy(-8, 0)
          this.setState({
            player_position: {
              ...player_position,
              x: x - 8,
            },
            column: column - 1
          })
          break;
        }
      case 'player':
        break;
      case 'E':
        if(hitbox > 0) {
          window.scrollBy(-16, 0)
          this.setState({
            player_position: {
              ...player_position,
              x: x - 16,
            },
            column: column - 2
          })
          break;
        } else {
          window.scrollBy(8, 0)
          this.setState({
            player_position: {
              ...player_position,
              x: x + 8,
            },
            column: column + 1
          })
          break;
        }
      case 'SW':
        if(hitbox > 0) {
          window.scrollBy(16, 8)
          this.setState({
            player_position: {
              ...player_position,
              x: x + 16,
              y: y - 16
            },
            column: column + 2,
            row: row - 2
          })
          break;
        } else {
          window.scrollBy(-8, 8)
          this.setState({
            player_position: {
              ...player_position,
              x: x - 8,
              y: y + 8
            },
            column: column - 1,
            row: row + 1
          })
          break;
        }
      case 'S':
        if(hitbox > 0) {
          window.scrollBy(0, -16)
          this.setState({
            player_position: {
              ...player_position,
              y: y - 16,
            },
            row: row - 2
          })
          break;
        } else {
          window.scrollBy(0, 8)
          this.setState({
            player_position: {
              ...player_position,
              y: y + 8,
            },
            row: row + 1
          })
          break;
        }
      case 'SE':
        if(hitbox > 0) {
          window.scrollBy(-16, -16)
          this.setState({
            player_position: {
              ...player_position,
              x: x - 16,
              y: y - 16,
            },
            column: column - 2,
            row: row - 2
          })
          break;
        } else {
          window.scrollBy(8, 8)
          this.setState({
            player_position: {
              ...player_position,
              x: x + 8,
              y: y + 8,
            },
            column: column + 1,
            row: row + 1
          })
          break;
        }
      default: return null;
    }
  }

  changeDirection = direction => {
    this.setState({ direction })
  }

  stopMoving = () => {
    this.setState({ direction: 'player' })
  }

  render() { 
    const grid = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      position: 'fixed',
      zIndex: 10001,
      height: 'calc(100% - 37px)',
      width: 'calc(100% - 37px)',
    }
    
    const direction_grid = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid yellow'
    }

    const player_grid = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const player_subpixel = {
      border: '1px solid red',
      height: '25px',
      width: '40px',
      zIndex: 10000
    }

    const directions = ['NW', 'N', 'NE', 'W', 'player', 'E', 'SW', 'S', 'SE']

    return (
      <>
        <div style = { grid }>
          { directions.map((item, i) => {
            if(item === 'player') {
              return (
                <div 
                  style = { player_grid }
                  onMouseEnter = { () => this.changeDirection(item)  }
                >
                  <div 
                    style = { player_subpixel } 
                    ref='player_position'
                    id='player_position'
                  ></div>
                </div>
              )
            } else {
              return (
                <div 
                  id = { i + 1 }
                  style = { direction_grid }
                  onMouseEnter = { () => this.changeDirection(item)  }
                >
                  { item }
                </div>
              )
            }
          }) }
        </div>
        <CanvasGrid 
          container = { this.props.container }
          map = { this.state.map }
          player_position = { this.state.player_position }
          player_grid = { this.state.player_grid }
          direction = { this.state.direction }
          stopMoving = { this.stopMoving }
        />
      </>
    )
  }
}

class CanvasGrid extends Component {
  state = {
    canvas: {
      width: 0,
      height: 0
    },
    interval: null
  }

  componentDidMount() {
    const { width, height } = this.refs.canvas.getBoundingClientRect();

    this.setState({ canvas: { width, height } })

    setTimeout(() => {
      this.actions().draw_map(this.props.map, '#00f', 1, tileset.island.colors)
      // this.setState({ interval: setInterval(() => this.actions().get_data(), 100) })
    }, 500)
  }

  actions = () => {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const ctx = canvas.getContext('2d');

    return { 
      draw_map: (data, background_color = '#00f', pixel_size = 10, colors) => {
        const {tileset, map} = data
        console.log(data)
        const height = map.length * 8 * pixel_size
        const width = map[0].length * 8 * pixel_size
        ctx.fillStyle = background_color
        ctx.fillRect(0,0,width,height)
        const pixels_per_line = 8 //need a way not to hardcode this
        let coordinates = {x: 0, y: 0}

        //temp grid
        for(let line=0;line<universe_variables.map_width*8*pixel_size; line+=8*pixel_size) {
          ctx.fillStyle = '#000'
          ctx.fillRect(line, 0, .5, universe_variables.map_width*8*pixel_size) //verticle
          ctx.fillRect(0, line, universe_variables.map_width*8*pixel_size, .5) //horizontal
        }
    
        map.forEach(row => {
            coordinates.x = 0
            row.forEach(col => {
                if(col) {
                    const tile = decompress_tile(tileset[col])
                    draw_tile(ctx, coordinates, pixel_size, colors, tile)
                }
                coordinates.x += pixels_per_line * pixel_size
            })
            coordinates.y += pixels_per_line * pixel_size
        })
      },

      get_data: () => {
        const { player_position } = this.props
        const { x, y, w, h } = player_position;

        if(w > 0 && h > 0) {
          if(!ctx.getImageData(x, y, 40, 25).data.every(el => el === 255 || el === 0)) {
            // console.log('at land')
          } else {
            // console.log('in water')
          }
        }
      }
    }
  }

  render() {
    const canvas = {
      position: 'absolute',
      backgroundColor: '#ccc',
    }

    return (
      <canvas 
        ref='canvas' 
        width='5000' 
        height='5000' 
        style = { canvas }
      ></canvas>
    )
  }
}