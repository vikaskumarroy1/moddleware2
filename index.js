const express=require("express");

const app=express();

const loggingMiddleware=(req,res,next)=>{
    console.log("vikas roy", new Date());
    next();

}

const apiKeyMiddleware=(req,res,next)=>{
    if(req.query.apiKey=== "12345"){
       next(); 
    }else{
        res.json({
            success:false,
            message:"plesae pass API Key",
        })
    }
}
app.use(loggingMiddleware);
app.use(apiKeyMiddleware)

const products=[{
    id:1,
    name:"mobile",

},
{
    id:2,
    name:"laptop",
},
{
    id:3,
    name:"T-shirt",
}
];

app.get("/api/v1/get-products/:id",(req,res,next)=>{
    const product=products.find((product)=>product.id==req.params.id);
    if(product){
        res.json({
            success:true,
            data:product,
        })
    }else{
        res.status(404).json({
            success:false,
            massage:"this id data is not found"
        })
    }
})
   
app.listen(8080,()=>{
    console.log("server is running");
})