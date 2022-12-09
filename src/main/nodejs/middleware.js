
const express = require('express');

const path = require('path');

const route = require("./routes/index");

const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(route);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;
app.listen(port);
