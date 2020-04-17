const express=require('express');
const router=express.Router();
const Cryptr=require('cryptr')
const cryptr=new Cryptr('devnami')


router.get('/',(req,res)=>{
    res.send("go to /products to see products")
})

router.get('/getData',(req,res)=>{
    const selectAll='select * from rasalay'
    db.query(selectAll,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            var intrest=results.map((e)=>{
                e.name=cryptr.decrypt(e.name)
                e.catagories=cryptr.decrypt(e.catagories)
                return e;             
            })
            return res.json({
                intrest
            })
        }
    })
})

router.post('/addData',(req,res)=>{
    const name=cryptr.encrypt(req.query.name);
    const catagory=cryptr.encrypt(req.query.catagory);
    const path=req.query.path;

    const insertData=`insert into rasalay(Id,name,path,catagories) VALUES('','${name}','${path}','${catagory}')`
    db.query(insertData,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data:"data added"
            })
        }
    })
})

router.delete('/delData/:id',(req,res)=>{
    
    const del=`DELETE FROM rasalay WHERE Id = '${parseInt(req.params.id)}'`;
    db.query(del,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data:"Deleted"
            })
        }
    })
})
module.exports=router;