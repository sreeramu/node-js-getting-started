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
          var response = "{\"payload\": {\"google\": {\"expectUserResponse\": true,\"richResponse\": {\"items\": [{\"simpleResponse\": {\"ssml\": \"<speak>Hello <audio src='https://r1---sn-h5576n7k.googlevideo.com/videoplayback?lmt=1528702884740653&itag=18&requiressl=yes&ip=125.17.165.43&source=youtube&dur=40.077&fvip=1&id=o-ALqm4UNFeH0sWcEKzMGKRfcLrvRNEBQu__iJBc-z17aR&mime=video%2Fmp4&expire=1528898363&initcwndbps=890000&ratebypass=yes&ipbits=0&gcr=in&c=MWEB&gir=yes&mn=sn-h5576n7k%2Csn-h557snsl&mm=31%2C29&key=yt6&signature=D4F8D0C9DC94A4AE62E0F0F2AF7003EE482A2A3D.ACE11ACE3E5F5327FAB0E9BA6889C06A6B925484&clen=3687215&pl=24&mv=m&mt=1528876640&ms=au%2Crdu&sparams=clen%2Cdur%2Cei%2Cgcr%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&ei=284gW8y0H4mMz7sP_uaIwAk&cpn=zgFp_jKSs3YqD6SM&cver=2.20180612&ptk=youtube_single&oid=JEQqk2qq_a3keyyPTt1JJQ&ptchn=vrhwpnp2DHYQ1CbXby9ypQ&pltype=content'>your wave file</audio></speak>\",\"displayText\": \"This is a SSML sample. Make sure your sound is enabled to hear the demo\"}}]}}}}";
          console.log("response: " + response);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(response);
        });
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
