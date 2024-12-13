const express = require('express')
const router = express.Router();
const { Customers } = require('../models');

 router.get("/",(req,res) => {
    res.send("Hello world");
 });

router.post("/", async (req,res) => {
    const post = req.body;
   await Customer.create(post);
   res.json(post);
});
module.exports = router;
