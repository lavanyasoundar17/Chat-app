const express = require('express');

const app = express();
app.get('/hello',function(req,res){
    res.send("Hello")
})

app.listen(5000,()=>{
    console.log('Server is running on portal 5000')
})