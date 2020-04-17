const express=require('express');
const router=express.Router();
const Cryptr=require('cryptr');
const cryptr=new Cryptr('this')



router.get('/',(req,res)=>{
    res.send("user work correctly")
})

router.get('/addAdmin',(req,res)=>{
    const name=req.query.userName
    const password=req.query.password
    const email=req.query.email
    const insert= `INSERT INTO admin(Id, name,email,password,avater) VALUES ('','${name}','${email}','${password}','')`;

    db.query(insert,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send("successfully added product");
        }
    })
})
router.get('/adminGet',(req,res)=>{
    const name=req.query.userName
    const password=req.query.password
    const insert= `select * from admin where name='${name}' and password='${password}'`;
    db.query(insert,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('ok')
            
        }
    })
})
module.exports=router;


