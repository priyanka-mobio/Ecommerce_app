const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


// get product data API
router.get("/getproducts", async (req, res) => {
  try {
    const producstdata = await Products.find();
     console.log("Console the data" + producstdata);
    res.status(201).json(producstdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
     console.log(id);

    const individualdata = await Products.findOne({ id: id });
     console.log(individualdata + "individual data") ;

    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error" + error.message);
  }
});

//Register data

router.post("/register", async (req, res) => {
  console.log(req.body);

  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "filll the all details" });
    console.log("no data avaliable");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "user is already present" });
    } 
    else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword not match" });
    } 
    else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // password hasing

      const storedata = await finalUser.save();
      console.log(storedata);

      res.status(201).json(storedata);
    }
  } catch (error) {}
});

// login user API

router.post("/login",async(req,res)=>{
    const {email,password}= req.body;

    if(!email || !password){
      res.status(400).json({error:"Fill the Data"})
    };

    try {
        const userlogin = await USER.findOne({email:email});
        console.log(userlogin + "login value");

        if(userlogin){
          const isMatch = await bcrypt.compare(password,userlogin.password);
          console.log(isMatch);

         


          if(!isMatch){
            res.status(400).json({error:"Password Invalid"})
          }else{ 
             // Generate Token
          const token = await userlogin.generateAuthtoken();
           console.log(token);

          // generate cookie

          res.cookie("Amazonweb",token, {
            expires: new Date(Date.now() + 19000000),
            httpOnly:true

          })
           
            res.status(201).json(userlogin);
          }
        }
        else{
          res.status(400).json({error:"Invalid Detail"}) 
        }
    } catch (error) {
        res.status(400).json({error:"Invalid details"})
    }

})

// Add data to cart

router.post("/addcart/:id", authenticate, async (req, res) => {
   try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    const Usercontact = await USER.findOne({ _id: req.userID });
    console.log(Usercontact);

    if(Usercontact){
      const cartData = await Usercontact.addcartdata(cart);
      await Usercontact.save();
      console.log(cartData);
      res.status(201).json(Usercontact);
    }else{
      res.status(401).json({error:"Invalid User"})
    }


   } catch (error) {
    res.status(401).json({error:"Invalid User"})
   }
});

// get cart details

router.get("/cartdetails",authenticate,async(req,res)=>{
  try {
    const buyuser = await USER.findOne({_id:req.userID});
    res.status(201).json(buyuser);
  } catch (error) {
      console.log("error" + error);
  }
});

// get valid user

router.get("/validuser",authenticate,async(req,res)=>{
  try {
    const validuserone = await USER.findOne({_id:req.userID});
    res.status(201).json(validuserone);
  } catch (error) {
      console.log("error" + error);
  }
});

//remove item from cart

router.delete("/remove/:id",authenticate,async(req,res)=>{
    try {
      const {id} = req.params;

      req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
        return cruval.id != id;
      });
      req.rootUser.save();
      res.status(201).json(req.rootUser);
      console.log("item remove");
    } catch (error) {
       console.log("error" + error);
      res.status(400).json(req.rootUser);
      
    }
})

//User LogOut

router.get("/logout",authenticate,(req,res)=>{
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
      return curelem.token !== req.token
    });

    res.clearCookie("Amazonweb",{path:"/"})

    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens)
    console.log("LogOut User");

  } catch (error) {
    console.log("Error User Logout");
  }
})



module.exports = router;
