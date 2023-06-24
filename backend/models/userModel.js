const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim:true,

        },
        password:{
            type: String,
            required: [true, "Password is required"],

        },
        requests: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Request',
            },
        ],
    }
    ,{timestamps: true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
const User = mongoose.model("User", userSchema);

module.exports = User;