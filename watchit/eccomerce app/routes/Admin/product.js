const express = require('express');
const produtsRepo = require('../../repository/products');
const productsNewTemplate = require('../../Views/Admin/products/new');


const router = express.Router();

router.get('/admin/product', (req, res) => {

});

router.get('/admin/product/new', (req, res) => {
    res.send(productsNewTemplate({}));

})

module.exports = router;