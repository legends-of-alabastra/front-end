import tileset from '../../../gen_ship/tileset'

export default (ship_angle) => {
    const ship = tileset.ship[ship_angle]
    const colors = tileset.colors
    const canvas = document.getElementById('ship')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,ship.length, ship[0].length)

    for(let row=0; row<=ship.length-1; row++) {
        for(let col=0; col<=ship[0].length-1; col++) {
            if(ship[row][col] !== 0) {
                ctx.fillStyle = colors[[ship[row][col]]]
                ctx.fillRect(row,col,1,1)
            }
        }
    }
}