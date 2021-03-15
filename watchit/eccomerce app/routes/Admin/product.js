const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middleware');
const productsRepo = require('../../repository/products');
const productsNewTemplate = require('../../Views/Admin/products/new');
const productsIndexTemplate = require('../../Views/Admin/products/index');
const productsEditTemplate = require('../../Views/Admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.get('/admin/product', requireAuth, async(req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

router.get('/admin/product/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({}));

});

router.post('/admin/product/new', requireAuth, upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async(req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.redirect('/admin/product');
});

router.get('/admin/product/:id/edit', async(req, res) => {
    const product = await productsRepo.getOne(req.params.id);

    if (!product) {
        return res.send('Product not found');
    }
    res.send(productsEditTemplate({ product }));
})


module.exports = router;