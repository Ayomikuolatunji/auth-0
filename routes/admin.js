const path = require('path');

const isAuth=require("../middleware/is-auth")
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth.isAuth,adminController.getAddProduct);

// /admin/products => GET
router.get('/products',isAuth.isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',isAuth.isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId',isAuth.isAuth, adminController.getEditProduct);

router.post('/edit-product',isAuth.isAuth, adminController.postEditProduct);

router.post('/delete-product',isAuth.isAuth, adminController.postDeleteProduct);

module.exports = router;
