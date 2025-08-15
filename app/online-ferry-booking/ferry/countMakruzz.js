export function countMakruzzFerry({ data = [] }) {
    let ships = []
    data.forEach((item) => {
        const ship = ships.indexOf(item.ship_title);
        if (ship === -1) {
            ships.push(item.ship_title);
        }
    })
    return ships.length;
}