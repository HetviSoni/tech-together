const asyncHandler = require("express-async-handler"); 
const User = require("../models/userModel");
const Incident = require("../models/reportModel");
const jwt = require("jsonwebtoken");
// const JWT_SECRET= "secret";
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const CryptoJS = require('crypto-js');
const incident_secret = process.env.INCIDENT_SECRET;

const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: "30d",
    })
}


const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    //check if account already exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //create user
    const user = await User.create({
        name,email,password
    })

    //generate token

    const token = generateToken(user._id);
    console.log(token+" is token");
    //send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        // maxAge: 1000*60*60*24*30,
        expires: new Date(Date.now() + 1000*60*60*24*30),
        sameSite: "none",
        // secure: true,
    });
    if(user){
        res.status(201);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: token,
        })
    }
    else{
        res.status(400);
        throw new Error("Some error occured");
    }

});


//login user

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({email});

    if(!user)
    {
        res.status(400);
        throw new Error("User does not exist");
    }   
    const passwordMatch = await bcrypt.compare(password, user.password);
    const token = generateToken(user._id);
    console.log(token+" is token");

    //send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000*60*60*24*30),
        sameSite: "none",
        // secure: true,
    });
    if(user && passwordMatch){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            bio: user.bio,
            token: generateToken(user._id),

        })
    }
    else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
});


//get user profile
const getUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
})

//login status
const loginstatus = asyncHandler(async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        res.json({
            status: false,
        })
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
        
        res.json({
            status: true,
        })
    }
})

//report incident
const reportIncident = asyncHandler(async (req, res) => {
    const { name, email, title, description, whoDid, date } = req.body;
    
    // Encrypt the victim's name and email
    const encryptedName = CryptoJS.AES.encrypt(name, incident_secret).toString();
    const encryptedEmail = CryptoJS.AES.encrypt(email, incident_secret).toString();
    
    // Create the incident report
    const incident = new Incident({
      name: encryptedName,
      email: encryptedEmail,
      title,
      description,
      whoDid,
      date,
    });
  
    // Save the incident report
    await incident.save();
  
    res.status(201).json({ message: 'Incident reported successfully' });
  });
  
module.exports = {registerUser,loginUser,getUser,loginstatus, reportIncident};