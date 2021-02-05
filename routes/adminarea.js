const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { verifyAdmin, verifyUser } = require("../vertify");
const Query = require("../db");


router.get('/',(req, res)=>{
    res.send("bdika") 
})

router.get("/idregistertest", async(req,res) => {
 
  try {
    let q = `SELECT * from users`
    let users = await Query(q)
    res.json (users.id)
    
  } catch (err) {
    res.sendStatus(500)
  }
});


router.post("/addcategory",verifyAdmin,async(req,res) =>{
    const {productcode,categoryname } = req.body;
    if ( productcode&& categoryname) {
      let q = `INSERT INTO productcategory(productcode,categoryname)
      VALUES ("${productcode}", "${categoryname}")`
    try {
      let reesulte = await Query(q)
      let product = await Query(`SELECT * FROM productcategory`)
    res.json(product)
    } catch (error) {
      res.sendStatus(500)}
    }else{
      res.status(400).json({error:true, msg:'missing some info'})
    }
})

router.post("/add",verifyAdmin,async(req,res) => {  
    const {productid, productname, categoryid, price, photo} = req.body;
    if (productid&& productname&& categoryid&& price&& photo) {
      let q = `INSERT INTO product( productid, productname, categoryid, price, photo)
      VALUES ("${productid}","${productname}", "${categoryid}", "${price}",  "${photo}")`
    try {
      await Query(q)
      let q2 =`SELECT * FROM product`
      let product = await Query(q2,[productid, productname, categoryid, price, photo])
    res.json(product)
    } catch (error) {
      res.sendStatus(500)}
    }else{
      res.status(400).json({error:true, msg:'missing some info'})
    }
  })


router.post("/edit",verifyAdmin,async(req,res) => {  
    const {productid ,productname, categoryid, price, photo} = req.body;
    if (productid&& productname&& categoryid&& price&& photo) {
      let q = `UPDATE product SET  productname='${productname}', categoryid=${categoryid}, price=${price}, photo='${photo}'
      WHERE productid = ${productid}`
    try {
      await Query(q)
      let q2= (`SELECT * FROM product`)
      let product =await Query(q2,[productid ,productname, categoryid, price, photo])
    res.json(product)
  
    } catch (error) {
      res.sendStatus(500)}
    }else{
      res.status(400).json({error:true, msg:'missing some info'})
    }
  })
  
module.exports = router;