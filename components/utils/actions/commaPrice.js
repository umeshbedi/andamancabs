export function commaPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}