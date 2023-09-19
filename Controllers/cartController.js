const carts =require('../model/cartSchema');


//add to cart
exports.addtocart=async(req,res)=>{
    //get  product details from the request

     //js destructuring
     const{id,title,price,image,quantity}=req.body

     try{

         const product=await carts.findOne({id})
         
         //check if product already in cart then update the quantity and price
         if(product){
            //if product is already in cart, increment the quantity
            product.quantity+=1
            //update grand total
            product.grandTotal=product.price*product.quantity
            //save the changes into db
            product.save()
            //send response back to the client
            res.status(200).json("item updated")
         }
         //else add to cart
         else{
            // product is not in the cart , add to cart 
            const newProduct=new carts({id,title,price,image,quantity,grandTotal:price})
            //save thw newProduct
            await newProduct.save()
            res.status(200).json("Item added successfully")
         }
     }
     catch(error){
        res.status(401).json(error)
     }
     
    }

//get wishlist products from db
exports.getcart=async(req,res)=>{
    try{
        //logic
        const cartProduct = await carts.find()
        res.status(200).json(cartProduct)     //response send back to client
    }
    catch(error){
        res.status(404).json(error)   //error sent back to the client

    }
}

//delete cart product from db
exports.deletecart=async(req,res)=>{
    //get particular product id
    const {id}=req.params
    try{
        //logic
        const removecart=await carts.deleteOne({id})
        if(removecart.deletecount!=0){
            //get all cart product after removing particular product
            const remainingcart=await carts.find()
            res.status(200).json(remainingcart)     //response send back to client
        }
    }
    catch(error){
        res.status(404).json(error)   //error sent back to the client

    }
}

// increment cart items
exports.incrementCartitems=async(req,res)=>{
    //get product id from request
    const {id}=req.params
    try{
        //check if product is present in cart
        const product = await carts.findOne({id})
        if(product){
            //update the quantity and grandtotal
            product.quantity+=1
            product.grandTotal=product.quantity*product.price
            //save changes to the db
            await product.save()
            console.log(product);
            //updated details send back to the client
            const cartProduct = await carts.find()
            res.status(200).json(cartProduct)   //send response back to  the client
        }
        else{
            res.status(404).json("product not found")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}

//decrement cart count
exports.decrementCartitems=async(req,res)=>{
    //get product id from request
    const {id}=req.params
    try{
        //check if product is present in cart
        const product = await carts.findOne({id})
        if(product){
            product.quantity-=1

            if(product.quantity==0){
                const removecart=await carts.deleteOne({id})
                const remainingcart=await carts.find()
                res.status(200).json(remainingcart) 
            }
            else{
                //update the quantity and grandtotal
                product.grandTotal=product.quantity*product.price
                //save changes to the db
                await product.save()
                console.log(product);
                //updated details send back to the client
                const cartProduct = await carts.find()
                res.status(200).json(cartProduct)   //send response back to  the client
            }
            
        }
        else{
            res.status(404).json("product not found")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}

    
