'use strict';

var fs      = require('fs')
  , path    = require('path')
  , url     = require('url')
  , request = require('request')

// Don't check our secrets in to Git
var secretsFilename = path.join(__dirname, 'secrets.json')
var secrets = JSON.parse(fs.readFileSync(secretsFilename))


////////////////////////////////////////////////////////////////
//
// Make a request to the echonest api.
//
// path:      echo nest method. ex "api/v4/track/profile"
// options:   additional query parameters
// filename:  (optional) write results to json file
// callback:  call on results
//
////////////////////////////////////////////////////////////////
module.exports.echo = function(path, options, filename, callback){

  // Allow us to pass callback as 3rd parameter. Throw if 
  // callback is missing.
  if (!callback && typeof filename === 'function'){
    callback = filename
  }
  if (typeof callback !== 'function'){
    throw new Error('must pass a callback as a final argument')
  }

  // Ensure we have a path
  if (typeof path !== 'string'){
    callback(new Error('options missing path. Ex: "api/v4/track/profile"'))
    return
  }

  // Construct api request url, starting with the query parameters
  var urlObj = {
    hostname:   'developer.echonest.com'
    , protocol: 'https'
    , pathname: path
    , query: {
      api_key:  secrets.echo_nest_api_key
      , format: 'json'
    }
  }
  for (let key in options){
    urlObj.query[key] = options[key]
  }
  var fullRequestUrl = url.format(urlObj)

  var requestCallback = function(err, res, body){
    if (err) {
      console.log('Error getting results', err)
      callback(err)
      return
    }
    try {
      var data = JSON.parse(body)
    } catch (localError) {
      console.error('Error parsing body:', localError, body)
      callback(localError)
      return
    }
    callback(null, data)
    return
  }

  // If we have a filename, pipe results to the file
  if (typeof filename === 'string') {
    request(fullRequestUrl, requestCallback).pipe(fs.createWriteStream(filename))
  } else {
    request(fullRequestUrl, requestCallback)
  }
}


var opts = {
  bucket: ['audio_summary']
  , id:     'TRTLKZV12E5AC92E11'
}

module.exports.echo(
  'api/v4/track/profile'
  , opts
  , path.join(__dirname, 'data/results.json')
  , (err, json)=>{
    console.log("ERR:",err)
    console.log("JSON:", json)
  }
)
