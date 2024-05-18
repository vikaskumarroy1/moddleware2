const express=require("express");

const app=express();

const loggingMiddleware=(req,res,next)=>{
      const startTime = Date.now();
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    console.log(`[${timestamp}] ${method} ${url} - ${timeTaken}ms`);
  });
       
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

app.get("/api/v1/get-products/:id",(req,res)=>{
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
   
app.post("/app/v1/get-orders",(req,res)=>{
    res.json({
        success:true,
        message:"Dummt get orders API"
    })
})
app.listen(8080,()=>{
    console.log("server is running");
})