const express=require('express');
const router=express.Router();
const Cryptr=require('cryptr')
const cryptr=new Cryptr('devnami')


router.get('/',(req,res)=>{
    res.send("go to /products to see products")
})

router.get('/getData',(req,res)=>{
    const selectAll='select * from persons'
    db.query(selectAll,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            var data=results.map((e)=>{
                e.pName=cryptr.decrypt(e.pName)
                e.about=cryptr.decrypt(e.about)
                e.work=cryptr.decrypt(e.work)
                return e;             
            })
            return res.json({
                data
            })
        }
    })
})

router.post('/addData',(req,res)=>{
    const pName=cryptr.encrypt(req.query.pName);
    const about=cryptr.encrypt(req.query.about);
    const work=cryptr.encrypt(req.query.work);
    const pic=req.query.pic;

    const insertData=`insert into persons(Id,pName,pic,about,work) VALUES('','${pName}','${pic}','${about}','${work}')`
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
    
    const del=`DELETE FROM persons WHERE Id = '${parseInt(req.params.id)}'`;
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