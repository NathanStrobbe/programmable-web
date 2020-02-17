let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let multer = require('multer');
let cors = require('cors');


const app = express();
const http = require('http').Server(app);
const upload = multer();

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('');
    next();
});

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'plugin', maxCount: 1 }]));

let apiRoutes = require('./api-routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://flms:flms@flms-cpwc5.gcp.mongodb.net/dev?retryWrites=true&w=majority').then(() => {
    console.log('Connected to BDD');
}).catch(console.error);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', apiRoutes);

module.exports = app;