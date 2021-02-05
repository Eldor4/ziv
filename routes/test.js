const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { verifyAdmin, verifyUser } = require("../vertify");
const Query = require("../db");



// router.get('/',(req, res)=>{
//     res.send("bdika") 

// })

module.exports = router;
