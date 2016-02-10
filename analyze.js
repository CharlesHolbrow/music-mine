'use strict';


var async = require('async')
  , fs    = require('fs')
  , echo  = require('./echo-nest-request.js').echo


var songs = JSON.parse(fs.readFileSync('./data/hot-songs.json')).response.songs
var id = 'TRTLKZV12E5AC92E11' // weezer - el scorcho

async.mapLimit(
  songs.slice(0,6)
  , 5 // max concurrent requests
  , (song, doneCb)=>{
    console.log('requesting:', song.title)
    echo(
      'api/v4/track/profile'
      , {
        id: song.id
        , bucket: ['audio_summary']
      }
      , doneCb
    )
  }, (err, results)=>{
    console.log(err)
    fs.writeFileSync('./data/profiles.json', JSON.stringify(results))
  }
)
