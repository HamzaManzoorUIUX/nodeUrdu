const express=require('express');
const router=express.Router();
const Cryptr=require('cryptr')
const cryptr=new Cryptr('devnami')


router.get('/',(req,res)=>{
    res.send("go to /products to see products")
})

router.get('/getData',(req,res)=>{
    const selectAll='select * from intresting'
    db.query(selectAll,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            var data=results.map((e)=>{
                e.data=cryptr.decrypt(e.data)
                e.title=cryptr.decrypt(e.title)
                return e;             
            })
            return res.json({
                data
            })
        }
    })
})

router.post('/addData',(req,res)=>{
    const data=cryptr.encrypt(req.query.data);
    const title=cryptr.encrypt(req.query.title);
    const date=req.query.date;
    const pic=req.query.pic;

    const insertData=`insert into intresting(Id,date,data,title,pic) VALUES('','${date}','${data}','${title}','${pic}')`
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
    
    const del=`DELETE FROM intresting WHERE Id = '${parseInt(req.params.id)}'`;
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