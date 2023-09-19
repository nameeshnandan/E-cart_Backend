// logic to resolve 

//import product collcetion
const products=require('../model/productSchema')



// get all products 
exports.getallproducts = async (req,res)=>{
    //logic
    try{
        //get all products from products collection in mongodb
        const allProducts = await products.find()
        res.status(200).json(allProducts)   //response sent back to the client
    }
    catch(err){
        res.status(401).json(err)   //error sent back to the client
    }
}

//view particular product details
exports.viewproduct = async (req,res)=>{
    //logic
    //get paericular product id
    const id = req.params.id
    //get details of particular products
    try{
        const product = await products.findOne({id})
        if(product){
            res.status(200).json(product)   //product details send back to client
        }
        else{
            res.status(200).json("product not found")
        }
    }
    catch(err){
        res.status(200).json(err)
    }


}

