// Generated by CoffeeScript 1.4.0
(function() {
  var app, config, db, express, model, mongoose, render, rjs;

  express = require('express');

  mongoose = require('mongoose');

  rjs = require('rjs').installPrototypes();

  config = require('./config').config;

  render = require('./controller-helper.js').render;

  app = express();

  app.set('view engine', 'jade');

  app.set('views', __dirname + '/views');

  app.use(express.logger('dev'));

  app.use(express.bodyParser());

  app.use(express.cookieParser());

  app.use(express.session({
    secret: config.sessionSecret
  }));

  app.use(express["static"](__dirname + '/public'));

  mongoose.connect('mongodb://localhost/ccadmin');

  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    return console.log('Successfully connected to db');
  });

  model = {
    client: mongoose.model('Client', mongoose.Schema({
      _id: mongoose.Schema.ObjectId,
      name: String,
      clientType: String,
      created: Date,
      firstContact: Date,
      balance: Number,
      platform: String,
      timezone: String,
      referrer: String,
      city: String,
      state: String,
      email: String,
      phone: String,
      school: String,
      schoolProgram: String,
      schoolClass: String,
      notes: String,
      rate: String,
      payments: [
        {
          _id: mongoose.Schema.ObjectId,
          amount: Number,
          rate: Number,
          date: Date,
          notes: String
        }
      ],
      sessions: [
        {
          _id: mongoose.Schema.ObjectId,
          duration: Number,
          rate: Number,
          date: Date,
          notes: String
        }
      ]
    })),
    session: mongoose.model('Session', mongoose.Schema({
      _id: mongoose.Schema.ObjectId,
      duration: Number,
      name: String,
      rate: Number,
      date: Date,
      notes: String
    })),
    payment: mongoose.model('Payment', mongoose.Schema({
      _id: mongoose.Schema.ObjectId,
      amount: Number,
      name: String,
      rate: Number,
      date: Date,
      notes: String
    }))
  };

  app.get('/', function(req, res) {
    return model.client.find({
      $or: [
        {
          clientType: "Current Client"
        }, {
          clientType: "Lead"
        }
      ]
    }).sort('name').exec(function(err, clients) {
      return model.session.find({
        date: {
          $gte: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
        }
      }).sort('date').exec(function(err, sessions) {
        var dateValueSeries, dates, values;
        dateValueSeries = rjs.orderedGroup(sessions, 'date').map(function(dateGroup) {
          return {
            date: new Date(dateGroup.key).getTime(),
            value: dateGroup.items.length
          };
        });
        dates = dateValueSeries.pluck('date');
        values = dateValueSeries.pluck('value');
        return render(req, res, {
          title: 'College Coding Admin',
          seed: {
            view: 'index',
            data: {
              activeClients: clients.filter(function(client) {
                return client.clientType === 'Current Client';
              }),
              leads: clients.filter(function(client) {
                return client.clientType === 'Lead';
              }),
              sessionsPerDay: {
                x: dates,
                y: values
              }
            }
          }
        });
      });
    });
  });

  app.get('/client/:name', function(req, res) {
    return model.client.findOne({
      name: new RegExp('.*' + req.params.name + '.*', 'i')
    }).exec(function(err, client) {
      if (!client) {
        return render(req, res, {
          title: 'New Client: ' + req.params.name,
          seed: {
            view: 'newclient',
            data: {
              name: req.params.name
            }
          }
        });
      } else {
        return model.session.find({
          name: client.name
        }).sort('date').exec(function(err, sessions) {
          return model.payment.find({
            name: client.name
          }).sort('date').exec(function(err, payments) {
            client.sessions = sessions;
            client.payments = payments;
            return render(req, res, {
              title: req.params.name,
              seed: {
                view: 'client',
                data: client
              }
            });
          });
        });
      }
    });
  });

  app.post('/client/:name', function(req, res) {
    return model.client.update({
      name: new RegExp('.*' + req.params.name + '.*', 'i')
    }, req.body).exec(function(err, numberAffected, raw) {
      return res.send();
    });
  });

  app.post('/db/:collection', function(req, res) {
    var doc;
    doc = new model[req.params.collection](req.body);
    return doc.save(function() {
      return res.send();
    });
  });

  app.post('/client/:name/session', function(req, res) {
    return model.client.findOne({
      name: new RegExp('.*' + req.params.name + '.*', 'i')
    }).exec(function(err, client) {
      var session;
      session = new model.session(req.body);
      session.name = client.name;
      return session.save(function() {
        return res.send();
      });
    });
  });

  app.post('/client/:name/payment', function(req, res) {
    return model.client.findOne({
      name: new RegExp('.*' + req.params.name + '.*', 'i')
    }).exec(function(err, client) {
      var payment;
      payment = new model.payment(req.body);
      payment.name = client.name;
      return payment.save(function() {
        return res.send();
      });
    });
  });

  app.listen(process.env.PORT, function() {
    return console.log('Listening on port ' + process.env.PORT);
  });

  exports.app = app;

}).call(this);
