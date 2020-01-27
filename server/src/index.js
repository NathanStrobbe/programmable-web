let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');


const app = express();
const http = require('http').Server(app);
//var io = require('socket.io')(http);

app.use(cors());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("")
  next();
});

app.use(bodyParser.json());

let apiRoutes = require("./api-routes");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://flms:flms@flms-cpwc5.gcp.mongodb.net/test?retryWrites=true&w=majority').then(()=> {
	console.log('Connected to BDD')
})
.catch(err => console.log(err));

var db = mongoose.connection;

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', apiRoutes);

/*io.on('connection', (socket) => {
});*/


http.listen(3001, () => {
    console.info('Server listen on 3001');
});