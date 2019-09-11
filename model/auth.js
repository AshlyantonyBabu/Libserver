var mon=require('mongoose')
var libsch=mon.Schema
var libschema=new libsch({
    name:{type:String,required:true},
    discri:{type:String,required:true},
    id:{type:String,required:true},
    pic:{type:String,required:true}
})


var bookmodel=mon.model("authors",libschema,"author")
module.exports=bookmodel