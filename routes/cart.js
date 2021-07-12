const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { verifyAdmin, verifyUser } = require("../vertify");
const Query = require("../db");

//בקשה לקבלת עגלה פתוחה בלבד מיועד לשימוש קבוע
router.get('/:userid', async (req, res) => {
  try {
    let q = (`SELECT * from shoppingcart WHERE ? = userid and status = 'open'`)
    let respons = await Query(q, [req.params.userid])
    res.json(respons)
  } catch (err) {
    res.sendStatus(500)
  }
})
//קבלת עגלה לפי ID
router.get('/b/:userid',verifyUser, async (req, res) => {
  try {
    let q = (`SELECT * from shoppingcart WHERE ?=userid`)
    let respons = await Query(q, [req.params.userid])
    res.json(respons)
  } catch (err) {
    res.sendStatus(500)
  }
})
//SUM
router.get('/sumprice/:cart',verifyUser, async (req, res) => {
  try {
    let q = (`SELECT sum (generalprice) as sum
    from cartitem
    where  ?= cart`)
    let respons = await Query(q, [req.params.cart])
    res.json(respons)
  } catch (err) {
    res.sendStatus(500)
  }
})

//קבלת מוצרים לפי עגלה
router.get('/cart/:cart',verifyUser, async (req, res) => {
  try {
    let q = (`SELECT * from cartitem as c 
    join product as p
        on c.cartproductid = p.productid
       
        HAVING  ? = cart `)
    let respons = await Query(q, [req.params.cart])
    res.json(respons)
    if (!respons.length) {
      res.json('so')
    }
  } catch (error) {

  }
})
//עגלת לקוח חדש
router.post('/newshoppingcart', async (req, res) => {
  try {
    const { userid, productiondate, status } = req.body
    let q = (`insert into shoppingcart(userid,productiondate,status)
    values(?,?,?)`)
    let respons = await Query(q, [userid, productiondate, status])
    res.json(respons)
  } catch (error) {

  }
})
//Change status to open:
router.post('/changestatustoopen', verifyUser, async (req, res) => {

  try {
    const { cartid } = req.body
    let q = (`UPDATE shoppingcart
    set status = 'open'
    WHERE ${cartid}=cartid`)
    let respons = await Query(q, [cartid])
    res.json(respons)
  } catch (error) {
    res.send(error)
  }
})
//Change status to close

router.post('/changestatustoclose', verifyUser, async (req, res) => {

  try {
    const { cartid } = req.body
    let q = (`UPDATE shoppingcart
    set status = 'close'
    WHERE ? =cartid`)
    let respons = await Query(q, [cartid])
    // console.log(q)
    res.json(respons)
  } catch (error) {
    res.send(error)
  }
})

//Insert product to ORDER
router.post("/uptoorder",verifyUser,async(req,res)=>{
  const {userid,cart,amounttopay,orderdate,fourdigits,city,street}=req.body
  try {
    if(userid,cart,amounttopay,orderdate,fourdigits,city,street){
      let q =`INSERT INTO orders (userid,cart,amounttopay,orderdate,fourdigits,city,street)
      VALUES(?,?,?,?,?,?,?)`
      // ${userid},${cart},${amounttopay},${orderdate},${fourdigits},${city},${street}
      let respons = await Query(q,[userid,cart,amounttopay,orderdate,fourdigits,city,street])
  
      res.json(respons)
    }
  } catch (error) {
    res.sendStatus(500)
  }
})


//Insert or update product to cart
router.post("/addtocart", verifyUser, async (req, res) => {
  const { cartproductid, Amount, generalprice, cart } = req.body;
  try {
    if (cartproductid && Amount && generalprice && cart) {
      //Check if a product already exists
      let q = `SELECT * FROM cartitem WHERE
           cartproductid = ? and cart = ?`
      let cartitems = await Query(q, [cartproductid, cart])
      if (!cartitems.length) {

        //If it does not exist:

        q = `INSERT INTO cartitem(cartproductid,Amount,generalprice,cart)
    VALUES(${cartproductid},${Amount},${generalprice},${cart})`
        cartitems = await Query(q, [cartproductid, Amount, generalprice, cart])
      } else {
        let amount = cartitems[0].Amount + Amount
        let plusPrice = cartitems[0].generalprice + generalprice
        //If it exists:
        q = `UPDATE cartitem
              SET Amount =? ,generalprice = ?
              WHERE cartproductid =?`
        cartitems = await Query(q, [amount, plusPrice, cartitems[0].cartproductid])
      }
      ///Res:
      let q2 = (`SELECT * from cartitem as c 
               join product as p
                   on c.cartproductid = p.productid
                   HAVING  ? = cart `)
      let respons = await Query(q2, [cart])
      res.json(respons)
    } else {
      res.json({ error: true, msg: "missing some info" })
    }
  } catch (error) {
    res.sendStatus(500)
  }
})

//Delete cart product

router.post('/deleteproduct', verifyUser, async (req, res) => {
  const { id, cart } = req.body
  try {
    let q = `delete from cartitem where id =${id} `
    let respons = await Query(q, [id])
    let q2 = (`SELECT * from cartitem as c 
    join product as p
        on c.cartproductid = p.productid
        HAVING  cart =${cart}`)
    let responss = await Query(q2)
    res.json(responss)

  } catch (error) {
    // console.log(error)
  }
})
//Delete all cart  pruducts

router.post('/deletecart', verifyUser, async (req, res) => {
  const { cart } = req.body
  try {
    let q = `delete from cartitem where cart =${cart} `
    let respons = await Query(q, cart)
    let q2 = (`SELECT * from cartitem as c 
    join product as p
        on c.cartproductid = p.productid
        HAVING  cart =${cart}`)
    let responss = await Query(q2)
 
    res.json(responss)

  } catch (error) {
    // console.log(error)
  }
})

router.get('/countdate', async(req, res) => {
  try {
      let q = `select COUNT(orderdate) counter, orderdate
      FROM orders
      group by orderdate`
      let result = await Query(q)
      // let threeOrders = result.filter(item => item.counter >= 3)
      // res.json(threeOrders)

      //console.log(result)
  // console.log(q)
    res.json(result,'ddd')
  } catch (error) {
      res.sendStatus(500)
  }
})
//delete from cartitem where cart=27 and cartproductid= 2221
module.exports = router;
