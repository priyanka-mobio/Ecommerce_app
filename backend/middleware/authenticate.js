const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretkey = process.env.KEY;

const authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(token,secretkey);
        console.log(verifyToken); 

        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token });
        console.log(rootUser);

        if(!rootUser){
            throw new error("User Not Found")
        };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorized: No Token Provide" );
        console.log(error)
    }
}

module.exports = authenticate;