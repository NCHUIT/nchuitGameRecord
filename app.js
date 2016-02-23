var express = require('express');
var app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var Record = require('./models/record');

var _ = require('lodash');

var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nchuitGameRecord');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(morgan());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

app.get('/record/list', function (req, res) {
  Record.find({}).sort({time: 'asc'}).exec(function(err, list) {
    if (err) { console.error(err)};
    res.json(list);
  })
});
app.get('/record/:id', function(req, res) {
  Record.findOne({ _id: req.params.id }, function(err, data){
    if (err) { console.error(err)};
    res.json(data);
  });
});
app.post('/record/new', function(req, res) {
  // var record = new Record({
  //   name: req.
  // })
  if ( _.isEmpty(req.body) ) {
    res.status(400);
    res.end();
  }
  var record = new Record(req.body);
  record.save(function(err, data) {
    if (err) { console.error(err)};
    res.json({
      message: 'Record add success!',
      data: data
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
