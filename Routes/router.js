// To define routes for the client request

//import express 
const express = require('express');

//import productController
const productController = require('../Controllers/productController')

//import productController
const wishlistController = require('../Controllers/wishlistController')

//import cartController
const cartController = require('../Controllers/cartController')

//using express create an object for router inorder to setup path
const router = express.Router();

//resolve various client requests
//api call
//1 get all products
router.get('/products/allProducts',productController.getallproducts)

//2 Veiw particular product details
router.get('/products/viewProduct/:id',productController.viewproduct)

//3 Wishlist particular
router.post('/products/addtowishlist',wishlistController.addtowishlist)

//4 View all wishlist products
router.get('/products/wishlist',wishlistController.getwishlist)

//5 remove particular item from wishlist
router.delete('/products/deletewishlist/:id',wishlistController.deletewishlist)

//6 Add to cart a particular product
router.post('/products/addtocart',cartController.addtocart)

//7 View all cart products
router.get('/products/cart',cartController.getcart)

//8 remove particular item from cart
router.delete('/products/deletecart/:id',cartController.deletecart)

//9 increment cartcount
router.get('/products/increment/:id',cartController.incrementCartitems)

//10 decrement cartcount
router.get('/products/decrement/:id',cartController.decrementCartitems)

//exports router
module.exports = router
