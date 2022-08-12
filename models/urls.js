const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const urlSchema=new Schema({
longURL:{
    type:String,
    required:true
},
shortID: {
    type: String, required: true,
},
click:{type:Number, default: 0}
},{
    timestamps:true
});



const Urls=mongoose.model("URL",urlSchema);
module.exports=Urls;
