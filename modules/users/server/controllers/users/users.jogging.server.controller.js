var mongojs = require('mongojs');
var db = mongojs('userlist', ['userlist']);
var bodyParser = require('body-parser');
var express = require('express');

// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());

exports.getuserlist = function (req, res) {

  db.userlist.find (function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
};

exports.postuserlist = function(req, res) {

  db.userlist.insert (req.body,function (err, doc) {
    res.json(doc);
  });
};

exports.deleteuserlistid = function (req, res) {

  var id = req.params.id;
  console.log(id);
  db.userlist.remove ( {_id:mongojs.ObjectId(id)},function(err, doc) {
    res.json(doc);
  })
};

exports.getuserlistid = function(req, res) {
  var id = req.params.id;

  db.userlist.findOne({_id:mongojs.ObjectId(id)},function(err, doc){
    res.json(doc);
  })
};

exports.putuserlistid = function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.userlist.findAndModify ( {
    query:{_id:mongojs.ObjectId(id)},update:{$set:{date:req.body.date,distance:req.body.distance,time:req.body.time,average:req.body.average}},
    new:true},function (err, doc) {
      res.json(doc);
    });
};
