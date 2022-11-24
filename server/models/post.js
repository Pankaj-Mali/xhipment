const mongoose= require("mongoose");

const Schema= mongoose.Schema

const postSchema= new Schema({
    name:{type:String , required: true },
    age:{type:Number , required: true },
    education:{type:String , required: true },
    gender:{type:String , required: true }
 
})

const post= mongoose. model("Post" , postSchema);

module.exports = post;