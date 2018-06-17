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
          requestify.get('https://youtubetransfer.com/getinfo/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Drc2ft794XNI').then(function(response) {
	// Get the response body
	  //var alink = 'https://youtubetransfer.com/download/?url=' + Buffer.from("https://www.youtube.com/watch?v=rc2ft794XNI").toString('base64')
          //var alink = JSON.parse(vresponse).link;
	  //alink = "http://cdl18.convert2mp3.net/download.php?id=youtube_3pDfR3XDgk8&key=MSjwWGGZFJ1Q&d=y";
          //var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"textToSpeech\": \"this is a simple response\"}}]}}}}";
          //var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"ssml\": \"<speak>Hello <audio src='"+alink+"'>your wave file</audio></speak>\",\"displayText\": \"This is a SSML sample. Make sure your sound is enabled to hear the demo\"}}]}}}}";
	  var alink = "https://r3---sn-gwpa-cagl.googlevideo.com/videoplayback?initcwndbps=327500&gir=yes&source=youtube&pl=36&c=MWEB&clen=130141916&mime=video%2Fwebm&fvip=3&sparams=aitags%2Cclen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2cms%2Cpl%2Crequiressl%2Csource%2Cexpire&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&pcm2cms=yes&key=yt6&ip=2405%3A204%3A578b%3Ae63f%3A1ddb%3Aa6e1%3A5056%3A8138&dur=624.499&lmt=1529182881781211&signature=CAE6776DB69569125292862E08426DEAF4BA2964.C810497D9FD282ADAD9F62DC94E4D2FFBD8D3662&id=o-ABxuLJc7uA6niyHjKFUQzXOovVpZeXIQzGaWco3opZZd&itag=248&requiressl=yes&ipbits=0&keepalive=yes&mm=31%2C29&mn=sn-gwpa-cagl%2Csn-h5576n7k&ei=J7AlW_qqEoOlz7sPwY2KoAg&ms=au%2Crdu&mt=1529196475&mv=m&expire=1529218183"
	  var response = "{\"payload\": {\"google\": {\"richResponse\": {\"items\": [{\"simpleResponse\": {\"textToSpeech\": \"ok\", \"displayText\": \"simpleResponse displayText\"}}, {\"mediaResponse\": {\"mediaType\": \"AUDIO\",\"mediaObjects\": [{\"name\": \"mediaResponse name\",\"description\": \"mediaResponse description\",\"contentUrl\": \""+alink+"\"}]}} ], \"suggestions\": [{\"title\": \"This\"}, {\"title\": \"That\"} ] } } }, \"source\": \"webhook-play-sample\"}";
          console.log("response: " + response);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(response);
});
        });
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
