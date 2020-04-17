const express=require('express')
const cors=require('cors')
const mysql=require('mysql')

const users=require('./routes/api/user')
const books=require('./routes/api/books')
const Intresting=require('./routes/api/Intresting')
const news=require('./routes/api/news')
const persons=require('./routes/api/persons')
const poetry=require('./routes/api/poetry')
const rasalay=require('./routes/api/rasalay')
const today=require('./routes/api/today')

const app=express();


const connection=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "urducorner",
})
connection.connect((err) => {
    if (err) {
      throw err
    }
    else {
      console.log("Connection is establish");
  
    }
  })
global.db=connection
app.use(cors());

app.use('/api/users',users)
app.use('/api/books',books)
app.use('/api/Intresting',Intresting)
app.use('/api/persons',persons)
app.use('/api/news',news)
app.use('/api/poetry',poetry)
app.use('/api/rasalay',rasalay)
app.use('/api/today',today)

app.listen(4000,()=>{
    console.log('products server listening on port 4000');
    
})