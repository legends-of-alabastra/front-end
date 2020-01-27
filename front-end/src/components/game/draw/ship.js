import tileset from '../../gen_ship/tileset'

export default (ship_coordinates, ship_angle, player_coordinates) => {
    let angle = Math.round(ship_angle/40)*45
    if(angle === 405) angle = 45
    if(angle === 360) angle = 0
    if(angle === -45) angle = 315
    const ship = tileset.ship[angle]
    const colors = tileset.colors
    const canvas = document.getElementById('ship')
    if(!canvas) return null
    const start_x = ship_coordinates.x - player_coordinates.x + window.innerWidth / 2
    const start_y = ship_coordinates.y - player_coordinates.y + window.innerHeight / 2
    const ctx = canvas.getContext('2d')
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

    for(let row=0; row<=ship.length-1; row++) {
        for(let col=0; col<=ship[0].length-1; col++) {
            if(ship[row][col] !== 0) {
                ctx.fillStyle = colors[[ship[row][col]]]
                ctx.fillRect(start_x+col,start_y+row,1,1)
            }
        }
    }
}