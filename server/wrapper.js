var app = require('express').Router();
var mongoose = require('mongoose');
var config = require('config');
var base = require('../base.js');
var dbUrl = 'mongodb://root:manager@ds015889.mlab.com:15889/url-shortener';

mongoose.connect(dbUrl);

// grab the url model
var Url = require('../model/db');

var wrapper = {
    home: app.get('/', function(req, res) {
        res.render('home.jade');
    }),
    shorten: app.post('/api/shorten', function(req, res) {
        var longUrl = req.body.url;
        var shortUrl = '';

        // check if url already exists in database
        Url.findOne({ long_url: longUrl }, function(err, doc) {
            if (doc) {
                shortUrl = config.get('webhost') + base.encode(doc._id);

                // the document exists, so we return it without creating a new entry
                res.send({ 'shortUrl': shortUrl });
            } else {
                // since it doesn't exist, let's go ahead and create it:
                var newUrl = Url({
                    long_url: longUrl
                });

                // save the new link
                newUrl.save(function(err) {
                    if (err) {
                        console.log(err);
                    }

                    shortUrl = config.get('webhost') + base.encode(newUrl._id);

                    res.send({ 'shortUrl': shortUrl });
                });
            }

        });

    }),
    encodedId: app.get('/:encoded_id', function(req, res) {

        var baseId = req.params.encoded_id;

        var id = base.decode(baseId);

        // check if url already exists in database
        Url.findOne({ _id: id }, function(err, doc) {
            if (doc) {
                res.redirect(doc.long_url);
            } else {
                res.redirect(config.get('webhost'));
            }
        });

    })


};

module.exports = wrapper;