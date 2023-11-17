const express = require('express');
const {mongoose} = require("mongoose")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config()
const UserModel = require('./models/usermodel.js')
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL=`mongodb+srv://${username}:${password}@concertdb.qfxuvx5.mongodb.net/Concert`;
// console.log(URL);
mongoose.connect(URL)
.then(() => console.log('DB connected'))
.catch((err) => console.log(err))

app.post('/login',(req,res) =>{
    console.log("its entering here too");
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () =>{
    console.log(`Server is running on port 3001`)
})