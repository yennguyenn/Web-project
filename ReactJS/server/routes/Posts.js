const express = require('express')
const router = express.Router();
const { Posts } = require('../models');

<<<<<<< HEAD
 router.get("/",async (req,res) => {
    const listOfPosts = await Posts. findAll();
=======
 router.get("/",async(req,res) => {
   const listOfPosts = await Posts.findAll();
>>>>>>> 82843b0def9981f9f7df7d93462f932ad0526f18
    res.json(listOfPosts);
 });

router.post("/", async (req,res) => {
<<<<<<< HEAD
   const post = req.body;
   await Posts.create(post);
=======
    const post = req.body;
   await Customer.create(post);
>>>>>>> 82843b0def9981f9f7df7d93462f932ad0526f18
   res.json(post);
});

module.exports = router;
