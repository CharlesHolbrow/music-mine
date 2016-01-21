'use strict';

var echo = require('./echo-nest-request.js').echo

var id = 'SOMVZDS14DDE5909E7'
id = 'SOCRHFJ12A67021D74'
id = 'TRTLKZV12E5AC92E11' // weezer - el scorcho

var query = {
  id: id
  , bucket: ['audio_summary']
}

var method ='api/v4/track/profile'

echo(
  method
  , query
  , (err, res)=>{
    console.log('err', err)
    console.log('res', res)
  }
)
