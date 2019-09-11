var exp=require('express')
const app=exp();
var bdy =require('body-parser')

app.use(bdy.urlencoded({extended:true}))
app.use(bdy.json());
var model1=require('../server/model/reg')
var modelbk=require('../server/model/lib')
var x
const path=require('path')
app.use(exp.static(path.join(__dirname,"/public")))
var mult=require('multer')
var storage=mult.diskStorage({destination:function(req,file,ks){
ks(null,(path.join(__dirname,"/uploads")))

},
filename:function(req,file,ks){
    x=file.originalname;
ks(null,file.originalname)
}})
let up=mult({storage:storage}).single('bkpicc')
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

});
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/library?retryWrites=true&w=majority"

mon.connect(url,function(err){
    if(err)throw err
    else{
        console.log("database connected")
    }
    
})
app.get("/mydata",function(req,res){
    res.send({data:"msg"})
})



app.get("/data/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={id:idi}
    modelbk.findOne(qry,function(err,result){
        if(err)throw err
        else{
            console.log("getdata")
              console.log(result)
            res.send(result)
           
        }
    })
})
   app.post("/login",function(req,res){
    username1=req.body.username
    console.log(username1)
    passwrd1=req.body.passwrd
    var qry={$and:[{username:{$eq:username1}},{passwrd:{$eq:passwrd1}}]}
       model1.findOne(qry,function(err,result){
             if(err)throw err
             else{
                 console.log(result)
                 res.send(result)
             }
             
         })
   })
   app.post("/reg",function(req,res){
    var u1= new model1()

    console.log(req.body.fname)
   u1.fname=req.body.fname
    u1.username=req.body.username
    console.log(req.body.passwrd)
    console.log(req.body.role)
   u1.passwrd=req.body.passwrd
    u1.role=req.body.role
    u1.save(function(err){
        if(err)
            throw err
        
        else{
           res.send("data added")
        }
    })
})
app.get("/view",function(req,res){
    modelbk.find({},function(err,result){
        if(err)throw err
        else{
            res.send(result)
        }
    })
})




app.post("/dbadd",up,function(req,res){
    if(req.body.bkname!=undefined){
    var bk=new modelbk()
    console.log(req.body.bkname)
    console.log(req.body.bkid)
    console.log(req.body.bkauth)
    console.log(req.body.bkdis)
    console.log(req.body.bkprice)
    console.log(req.body.bkpic)
    
    console.log(req.body.bkcat)
    bk.title=req.body.bkname
    bk.id=req.body.bkid
    bk.author=req.body.bkauth
    bk.category=req.body.bkcat
    bk.discription=req.body.bkdis
    bk.price=req.body.bkprice
    bk.pic=x;
    bk.save(function(err){
        if(err)throw err
        else{
            console.log("added");
        }
    })
}
})

app.get("/delete/:id",function(req,res){
    var idi=req.params.id
    var qry={id:idi}
    modelbk.deleteOne(qry,function(err,result){
        if(err)throw err
        else{
            res.send(result)
        }
    })
})
app.get("/viewpic/:pic",function(req,res){
    res.sendFile(__dirname+"/uploads/"+req.params.pic)
})
app.get("/viewre/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={id:idi}
    modelbk.find(qry,function(err,result){
        if(err)throw err
        else{
              console.log(result)
            res.send(result)
           
        }
    })


})

app.post("/getdata/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={id:idi}
    modelbk.find(qry,function(err,result){
        if(err)throw err
        else{
            console.log("getdata")
              console.log(result)
            res.send(result)
           
        }
    })


})
app.post("/append",function(req,res){

    
    //var e2=new emp();
   // console.log(idi)
    title=req.body.bkname
    
    author=req.body.bkauth
    
    discription=req.body.bkdis
    price=req.body.bkprice
    idi=req.body.bkid
console.log(req.body.bkname)
console.log(req.body.bkauth)
console.log(req.body.bkprice)
console.log(req.body.bkdis)
    var myquery = { id: idi };
  var newvalues = { $set: {title:title,author:author,discription:discription,price:price} };
  modelbk.updateOne(myquery, newvalues, function(err,result) {
    if (err) throw err;
   
   // db.close();
   else{
    console.log("1 document updated");
   // res.rendir('viewemp')
res.redirect('/book')
}
  
  });


})


app.listen(process.env.PORT||7000,function(req,res){
    console.log("server is ready")
})
