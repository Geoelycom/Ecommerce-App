const repository = require('./repository');

class CartsRepository extends repository {}

module.exports = new CartsRepository('carts.json');