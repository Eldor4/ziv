const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Query = require("../db");
const { verifyAdmin, verifyUser } = require("../vertify");


router.get("/productcatcount" ,async(req,res) => {
  try {
    let q = `SELECT count (*) as amount from product WHERE productid`
    let count = await Query(q)
    res.json(count)
  } catch (err) {
    res.sendStatus(500)
  }
});
router.get('/tocat/:categoryid', verifyUser, async(req,res)=>{
    try {
     
      let q = `select * from productcategory as c
      right join  product as p
      on c.productcode = p.categoryid
      HAVING ? = categoryid`
      let category=await Query(q,[req.params.categoryid])

      res.json(category)
    } catch (err) { 
      res.sendStatus(500)
    }
  })




router.get("/allcategory",async(req,res) => {
 
  try {
    let q = `SELECT * from productcategory`
    let allcategory = await Query(q)
    res.json (allcategory)
  } catch (err) {
    res.sendStatus(500)
  }
});

router.get("/allproducts",verifyUser ,async(req,res) => {

  try {
  
    let q = `SELECT * from product`
    let allproduct = await Query(q)
    res.json(allproduct)
    
  } catch (err) {
    res.sendStatus(500)
  }
});

//Search

router.post("/search", async (req, res) => {
  try {
    const { productname } = req.body
    if (productname) {
        let q = `SELECT *FROM product where (productname LIKE ?)`;
    let result = await Query(q, ["%" + productname + "%"]);
    res.status(200).json(result);
    
    //console.log(req.query)
    }
    
  } catch (err) {
    res.status(500);
  }
});
router.get('/countdate', async(req, res) => {
  try {
      let q = `select COUNT(orderdate) counter, orderdate
      FROM orders
      group by orderdate`
      let result = await Query(q)
      let threeOrders = result.filter(item => item.counter >= 3)
      res.json(threeOrders)

  } catch (error) {
      res.sendStatus(500)
  }
})

module.exports = router;

