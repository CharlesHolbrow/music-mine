'use strict';

var path = require('path')
  , echo = require('./echo-nest-request.js').echo

var params = {
  sort:       'song_hotttnesss-desc'
  , bucket:   ['song_hotttnesss', 'tracks', 'id:7digital-US']
  , results:  100
  , start:    0
  // , style:    'pop'
}

var filename = path.join(__dirname, 'data/hot-songs.json')

echo(
  'api/v4/song/search'
  , params
  , filename
  , (err, result)=>{
    console.error('err', err)
    console.log(result)
  }
)
