const express = require("express");
const app = express();
const path = require("path");
const port = 80;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);

//For serving static files
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//set template engine as pug
app.set('view engine', 'pug')

//set view directory
app.set('views', path.join(__dirname,'views'))

//ENDPOINTS
app.get('/',(req,res)=>{
      const params = {}
      res.status(200).render("home.pug", params)
});
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render("contact.pug", params)
});

app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("This item is not saved to the database")
    })
    // res.status(200).render("contact.pug")
});

//start the server
app.listen(port,()=>
{
    console.log(`The application started successfully at port ${port}`)
});