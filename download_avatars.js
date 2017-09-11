var request = require('request');
var filePath = "./downloadPics";
var GITHUB_USER = "dawadhakpabokhang";
var GITHUB_TOKEN = "67e8d115254c7d38a0f240517fe063286025986e";
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'dawadhakpabokhang',
      'Authorization': 'token 67e8d115254c7d38a0f240517fe063286025986e'
    }
  }

  request(options, function(error, response, body) {

      if (error) {
        callback(error);
        return;
      }

      if (response && response.statusCode === 200) {
        // Request OK, parse data
        var json = JSON.parse(body);
        for (contributor of json){
          downloadImageByURL(contributor.avatar_url, filePath + "/" + contributor.login)
        }
        return;
      }

  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
   .on('error', function (err) {
     throw err;
   })
   .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode);
   })
   // fs is in reference to file stream which needs to be defined above
   .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
