const express = require('express')
const path = require('path')
const requestify = require('requestify')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/', function(req,res) {
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
            console.log("Body: " + body);
          var obj = JSON.parse(body);
          var searchText = obj.queryResult.parameters.result;
          var speech = 'default hello';
          switch(searchText)
          {
            case 'hello':
              speech = 'Hi, nice to meet you';
              break;
            case 'bye':
              speech = 'bye, good night';
              break;
          }
          requestify.get('http://www.convertmp3.io/fetch/?format=JSON&video=youtube.com/watch?v=3pDfR3XDgk8').then(function(response) {
	// Get the response body
	        var vresponse = response.getBody();
          var alink = JSON.parse(vresponse).link;
	  //alink = "http://cdl18.convert2mp3.net/download.php?id=youtube_3pDfR3XDgk8&key=MSjwWGGZFJ1Q&d=y";
          //var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"textToSpeech\": \"this is a simple response\"}}]}}}}";
          //var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"ssml\": \"<speak>Hello <audio src='"+alink+"'>your wave file</audio></speak>\",\"displayText\": \"This is a SSML sample. Make sure your sound is enabled to hear the demo\"}}]}}}}";
	  var response = "{\"payload\": {\"google\": {\"richResponse\": {\"items\": [{\"simpleResponse\": {\"textToSpeech\": \"simpleResponse: testing\", \"displayText\": \"simpleResponse displayText\"}}, {\"mediaResponse\": {\"mediaType\": \"AUDIO\",\"mediaObjects\": [{\"name\": \"mediaResponse name\",\"description\": \"mediaResponse description\",\"contentUrl\": \""+alink+"\"}]}} ], \"suggestions\": [{\"title\": \"This\"}, {\"title\": \"That\"} ] } } }, \"source\": \"webhook-play-sample\"}";
          console.log("response: " + response);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(response);
});
        });
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
