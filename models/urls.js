const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const urlSchema=new Schema({
_id:{
    type:String
},
url:{
    type:String,
    required:true
}

},{
    timestamps:true
});



const Urls=mongoose.model("URL",urlSchema);
module.exports=Urls;
