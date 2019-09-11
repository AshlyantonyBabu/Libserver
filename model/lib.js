var mon=require('mongoose')
var libsch=mon.Schema
var libschema=new libsch({
    id:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    category:{type:String,required:true},
    discription:{type:String,required:true},
    price:{type:Number,required:true},
    pic:{type:String,required:true}
})


var bookmodel=mon.model("bookglr",libschema,"bookang")
module.exports=bookmodel