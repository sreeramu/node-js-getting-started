const express = require('express')
const path = require('path')
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
          //var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"textToSpeech\": \"this is a simple response\"}}]}}}}";
          var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"ssml\": \"<speak>Here are <say-as interpret-as=\"characters\">SSML</say-as> samples. I can pause <break time=\"3\" />. I can play a sound <audio src=\"https://actions.google.com/sounds/v1/alarms/winding_alarm_clock.ogg\">your wave file</audio>. I can speak in cardinals. Your position is <say-as interpret-as=\"cardinal\">10</say-as> in line. Or I can speak in ordinals. You are <say-as interpret-as=\"ordinal\">10</say-as> in line. Or I can even speak in digits. Your position in line is <say-as interpret-as=\"digits\">10</say-as>. I can also substitute phrases, like the <sub alias=\"World Wide Web Consortium\">W3C</sub>. Finally, I can speak a paragraph with two sentences. <p><s>This is sentence one.</s><s>This is sentence two.</s></p></speak>\",\"displayText\": \"This is a SSML sample. Make sure your sound is enabled to hear the demo\"}}]}}}}";
          console.log("response: " + response);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(response);
        });
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
