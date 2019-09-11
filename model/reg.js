var mon=require('mongoose')
var usersch=mon.Schema
var userschema=new usersch({
    fname:{type:String,required:true},
    username:{type:String,required:true},
    passwrd:{type:String,required:true},
    role:{type:String,required:true}
})
usermodel=mon.model("use",userschema,"user")
module.exports=usermodel