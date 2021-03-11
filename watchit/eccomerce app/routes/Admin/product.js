const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const produtsRepo = require('../../repository/products');
const productsNewTemplate = require('../../Views/Admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });




router.get('/admin/product', (req, res) => {

});

router.get('/admin/product/new', (req, res) => {
    res.send(productsNewTemplate({}));

});

router.post('/admin/product/new', [requireTitle, requirePrice], upload.single('image'), (req, res) => {

    const errors = validationResult(req);

    console.log(req.file);

    res.send('Submitted');
})


module.exports = router;