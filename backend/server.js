require('dotenv').config();
const express = require('express');

const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');

const corsOption={
    credentials: true,
    origin: ['http://localhost:3000']
};

app.use(cors(corsOption));

const PORT=process.env.port||5000;

DbConnect();
app.use(express.json());
app.use(router);

app.get('/',(req, res) => {
    res.send("hello");
});




app.listen(PORT,() => console.log("Server started on 5000 port"));