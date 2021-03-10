const express = require('express');
const { requirePasswordConfirmation } = require('./validators');


const router = express.Router();

router.get('/admin/product', (req, res) => {

});

router.get('/admin/product/new', (req, res) => {

})

module.exports = router;