require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.port;

app.use([cors(), 
      express.static(__dirname + '/client/build'),
 ]);



// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data / google:deprecated for more.
app.use(bodyParser.urlencoded({ extended: true }));

require(`${__dirname}/app/routes`)(app);
require('./app/routes')(app); //pasted afterwards
app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
})

