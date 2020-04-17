const express=require('express');
const router=express.Router();
const Cryptr=require('cryptr')
const cryptr=new Cryptr('devnami')


router.get('/',(req,res)=>{
    res.send("go to /products to see products")
})

router.get('/getData',(req,res)=>{
    const selectAll='select * from poetry'
    db.query(selectAll,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            var intrest=results.map((e)=>{
                e.poetName=cryptr.decrypt(e.poetName)
                e.catagory=cryptr.decrypt(e.catagory)
                e.data=cryptr.decrypt(e.data)
                return e;             
            })
            return res.json({
                intrest
            })
        }
    })
})

router.post('/addData',(req,res)=>{
    const pName=cryptr.encrypt(req.query.pName);
    const catagory=cryptr.encrypt(req.query.catagory);
    const data=cryptr.encrypt(req.query.data);

    const insertData=`insert into poetry(Id,poetName,catagory,data) VALUES('','${pName}','${catagory}','${data}')`
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
    
    const del=`DELETE FROM poetry WHERE Id = '${parseInt(req.params.id)}'`;
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