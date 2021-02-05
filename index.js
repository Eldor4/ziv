const express = require("express");
const cors = require("cors");
const db =require('./db')

const app = express();

app.use(express.json()); 
app.use(cors( 
   {credentials:true ,origin:true}
));

app.use('/users',require('./routes/users'))
app.use('/adminarea',require('./routes/adminarea'))
app.use('/product',require('./routes/product'))
app.use('/category',require('./routes/category'))
app.use('/test',require('./routes/test'))
app.use('/cart' ,require('./routes/cart'))
app.use("/public",express.static("public"))
app.use('/',express.static('./dist'))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
const port = process.env.PORT || 80;
console.log(port);
app.get("*", (req, res) => {
    res.redirect("/");
  });
  

app.listen(port,()=>console.log(`${port} is run`))