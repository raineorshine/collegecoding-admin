# includes
express =     require('express')
rjs =         require('rjs').installPrototypes()
config =      require('./config').config
render =      require('./controller-helper.js').render

# create app and set middleware
app = express()
app.set 'view engine', 'jade'
app.set 'views', __dirname + '/views'
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.cookieParser()
app.use express.session(secret: config.sessionSecret)
app.use express.static(__dirname + '/public')

# controller
app.get '/', (req, res) ->
  render req, res, 
    title: 'CC Admin'
    seed:
      view: 'index'

app.get '/:page', (req, res) ->
  render req, res, 
    title: 'CC Admin'
    seed:
      view: req.params.page

# start
app.listen process.env.PORT, ->
  console.log 'Listening on port ' + process.env.PORT

# export globals
exports.app = app