require('dotenv').config();
const express = require('express');

const app = express();
const router = require('./routes');
const PORT=process.env.port||5000;
app.use(express.json());
app.use(router);

app.get('/',(req, res) => {
    res.send("hello");
});




app.listen(PORT,() => console.log("Server started on 5000 port"));