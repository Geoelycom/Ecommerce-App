const express = require('express');
const cartsRepo = require('../repositories/carts')


const router = express.Router();

// revcieve a post request to add an item to a cart
router.post('/cart/products', async(req, res) => {
    let cart;
    if (!req.session.cartId) {




        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    console.log(cart);



    res.send('Product added to cart')
})

// recieve a GET request to show all items in a cart



// recieve a post request to delete an item from a cart

module.exports = router;