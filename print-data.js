'use strict';

var fs = require('fs')
  , path = require('path')

var songsRequestResult = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, 'data/hot-songs.json')
  )
)

var songs = songsRequestResult.response.songs;

// hotness returns a lot of duplicates. Filter them out as
// described here:
// https://developer.echonest.com/forums/thread/1347
var dups = {}
var hashSong = function(song){
  return song.artist_id + song.song_hotttnesss
}
var isUnique = function(song){
  var hash = hashSong(song)
  var isDupe = !dups[hash]
  dups[hash] = true
  return isDupe
}

var cleanedSongs = songs.filter(isUnique)

for (let song of cleanedSongs){
  console.log(song.artist_name, '-', song.title, '-', song.tracks)
}
