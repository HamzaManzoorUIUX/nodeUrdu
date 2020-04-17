const express=require('express');
const router=express.Router();
const Cryptr=require('cryptr')
const cryptr=new Cryptr('devnami')


router.get('/',(req,res)=>{
    res.send("go to /products to see products")
})

router.get('/getData',(req,res)=>{
    const selectAll='select * from books'
    db.query(selectAll,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            var data=results.map((e)=>{
                e.name=cryptr.decrypt(e.name)
                e.auther=cryptr.decrypt(e.auther)
                e.Categories=cryptr.decrypt(e.Categories)
                return e;             
            })
            return res.json({
                data
            })
        }
    })
})

router.post('/addData',(req,res)=>{
    const name=cryptr.encrypt(req.query.name);
    const auther=cryptr.encrypt(req.query.auther);
    const Categories=cryptr.encrypt(req.query.categories);
    const semester=req.query.semester;
    const stars=req.query.stars;
    const path=req.query.path;
    const cover=req.query.cover;

    const insertData=`insert into books(Id,name,auther,Categories,semester,stars,path,cover) VALUES('','${name}','${auther}','${Categories}','${semester}','${stars}','${path}','${cover}')`
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
    
    const del=`DELETE FROM books WHERE Id = '${parseInt(req.params.id)}'`;
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