const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Query = require("../db");
const { verifyAdmin, verifyUser } = require("../vertify");

//
router.get('/:categoryid', verifyUser, async(req,res)=>{
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

  
  
module.exports = router;
