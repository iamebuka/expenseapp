const express = require('express');
const mysql = require("mysql")
const bodyParser = require("body-parser")
const path = require("path")
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})



//retreive expenses
app.get('/api/expenses', (req, res) => {
  
    con.query("SELECT transvalue, category, date, note FROM expenses ORDER BY date desc",(err, result)=>{
      if(err) throw err
           res.send(result)
    });
  

})

//add new expenses
app.post("/api/expenses", (req, res) => {
  console.log(req.body)
  con.query("INSERT INTO expenses (transvalue, category, date, note) values (?, ?, ?, ?)", [req.body.transvalue, req.body.category, req.body.date, req.body.note], (err, result)=>{
    if(err) throw err;
    console.log(result)
    res.send(result)
 })

})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
