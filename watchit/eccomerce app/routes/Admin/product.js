const express = require('express');
const multer = require('multer');

const { handleErrors } = require('./middleware');
const productsRepo = require('../../repository/products');
const productsNewTemplate = require('../../Views/Admin/products/new');
const productsIndexTemplate = require('../../Views/Admin/products/index');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.get('/admin/product', async(req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

router.get('/admin/product/new', (req, res) => {
    res.send(productsNewTemplate({}));

});

router.post('/admin/product/new', upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async(req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.redirect('/admin/product');
})


module.exports = router;