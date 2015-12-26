'use strict';

var fs      = require('fs')
  , path    = require('path')
  , url     = require('url')
  , request = require('request')

// Don't check our secrets in to Git
var secretsFilename = path.join(__dirname, 'secrets.json')
var secrets = JSON.parse(fs.readFileSync(secretsFilename))

// Construct api request url, starting with the query parameters
var query = {
  api_key:  secrets.echo_nest_api_key
  , sort:   'song_hotttnesss-desc'
  , bucket: ['song_hotttnesss', 'tracks', 'id:7digital-US']
  // , style:  'pop'
  , results: 100
  , start:   0
}

var url = url.format({
  hostname:   'developer.echonest.com'
  , protocol: 'https'
  , pathname: 'api/v4/song/search'
  , query:    query
})

console.log('requesting:', url)

request(url, (err, res, body)=>{
  if (err) {
    console.log('Error getting results', err)
    return
  }
  try {
    let data = JSON.parse(body)
    handleSongsResponse(data)
  } catch (localError) {
    console.error('Error processing body:', localError, body)
    throw localError
  }
}).pipe(fs.createWriteStream(path.join(__dirname, 'data/hot-songs.json')))

var handleSongsResponse = function(resJson) {
  //
}
