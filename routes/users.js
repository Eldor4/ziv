const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { verifyAdmin, verifyUser } = require("../vertify");
const Query = require("../db");



router.get("/idregistertest/:toid", async(req,res) => {
 
  try {
    let q = (`SELECT id from users WHERE id= ?`)
    let respons = await Query(q,[req.params.toid])
    if(respons.length==1){
    res.json('notgood')
    }else{
      res.json('good')
    }
  } catch (err) {
    res.sendStatus(500)
  }
});
// //REGISTER
router.post("/register", async (req, res) => {
    try { 
    const { id,fname, lmame, userName, password  ,city, street} = req.body;
    let user = await Query(`SELECT * FROM users WHERE userName =?`,userName)
    //check body validty
    if (id && fname && lmame && userName && password && city && street) {
      if (!user.length) {
        const salt = genSaltSync(10);
        const hasht = hashSync(password, salt);
          let q = `INSERT INTO users (id, role, fname, lmame, userName, password,city, street,status)
    VALUES(?,"admin",?,?,?,?,?,?,'new')`;
          let results = Query(q, [id, fname, lmame, userName , hasht ,city, street, city]);
          
            res.status(201).json({ error: false, msg: "user add" });
          } else {
            res.status(400).json({ error: true, msg: "userName already taken" });
          }
        } else {
          res.status(400).json({ error: true, msg: "missing some info" });
        }
        } catch (error) {
          res.sendStatus(500);
        }
      });


  router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    
    if (userName && password) {
      try {
        let q = `SELECT id ,
        role,
        fname,
        lmame,
        userName,
        password,
        city,
        street,
        status
        FROM users WHERE userName = ?`;
        let user = await Query(q, [userName]);
        if (user.length) {
          if (user) {
            //passord match
            if (compareSync(password, user[0].password)) {
              let token = jwt.sign(
                {
                  id: user[0].id,
                  fname: user[0].fname,
                  role: user[0].role,
                },
                "blah",
                { expiresIn: "50m" }
              );
              let refresh_token = jwt.sign(
                {
                  id: user[0].id,
                },
                "refresh",
                { expiresIn: "7d" }
              );
              // user.refresh = refresh_token;
              res
                .status(200)
                .json({
                  error: false,
                  token,
                  refresh_token,
                  userid: user.id,
                  user
                });
         
                
            } else {
              res.status(401).json({ error: true, msg: "wrong password" });
            }
          } else {
            res.status(401).json({ error: true, msg: "user not found" });
          }
        }
      } catch (error) {
        res.sendStatus(500);
      }
    } else {
      res.status(400).json({ error: true, msg: "missing some info" });
    }
  });



//test 
router.get('status/:id',async(req, res) =>{

  try {
    let q = `SELECT status FROM users WHERE ?=id `
    let status = await Query(q,[req.params.id])
    res.json(status)

  } catch (err) { 
    res.sendStatus(500)
  }
})



  
      module.exports = router;
      
       