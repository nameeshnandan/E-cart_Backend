
//import wishlist collection
const wishlists =require('../model/wishlistSchema')
// const products =require('../model/productSchema')

//logic for wishlist
//add products to wishlist
exports.addtowishlist=async(req,res)=>{
    //get specific product details from the request

    //js destructuring
    const{id,title,price,image}=req.body

    //logic for wishlist
    try{
        //check if product already in wishlist
        const item = await wishlists.findOne({id})
        if(item){
            res.status(401).json('item already in wishlist')
        }
        else{
            //product is added to the wishlist
            const newProduct= await wishlists({id,title,price,image})
            //to store in db
            await newProduct.save()
            res.status(200).json("item added to wish list")     //response send back to client
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

//get wishlist products from db
exports.getwishlist=async(req,res)=>{
        try{
            //logic
            const wishlistProduct = await wishlists.find()
            res.status(200).json(wishlistProduct)     //response send back to client
        }
        catch(error){
            res.status(404).json(error)   //error sent back to the client

        }
}

//delete wishlist product from db
exports.deletewishlist=async(req,res)=>{
    //get particular product id
    const {id}=req.params
    try{
        //logic
        const removewishlist=await wishlists.deleteOne({id})
        if(removewishlist){
            //get all wishlist product after removing particular product
            const remainingwishlist=await wishlists.find()
            res.status(200).json(remainingwishlist)     //response send back to client
        }
    }
    catch(error){
        res.status(404).json(error)   //error sent back to the client

    }
}
